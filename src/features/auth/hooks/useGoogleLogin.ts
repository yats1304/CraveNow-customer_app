import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { ENV } from "@/config/env";
import { syncSession } from "@/features/helper/auth.helper";
import { authStorage } from "@/services/storage";
import { useAppDispatch } from "@/store/hooks";
import { showToast } from "@/utils";
import { getOrCreateDeviceId } from "@/utils/device";
import { router } from "expo-router";
import { useState } from "react";
import { authApi } from "../api";

GoogleSignin.configure({
  webClientId: ENV.GOOGLE_WEB_CLIENT_ID,
});

export function useGoogleLogin() {
  const dispatch = useAppDispatch();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signIn = async () => {
    setError(null);
    setIsPending(true);
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      const idToken = response.data?.idToken;

      if (!idToken) {
        throw new Error("No ID token received from Google.");
      }

      const deviceId = getOrCreateDeviceId();
      const apiResponse = await authApi.googleLogin({ idToken, deviceId });
      const { user, accessToken, refreshToken } = apiResponse.data;

      authStorage.saveSession({ user, accessToken, refreshToken });
      syncSession(dispatch, apiResponse.data);
      showToast.success("Signed in with Google successfully.");
      router.replace("/(protected)" as any);
    } catch (err: any) {
      if (err.code !== "SIGN_IN_CANCELLED") {
        setError(
          err?.response?.data?.message ||
            err?.message ||
            "Google Sign-In failed. Please try again.",
        );
      }
    } finally {
      setIsPending(false);
    }
  };

  return {
    signIn,
    isPending,
    error,
    isReady: true,
  };
}
