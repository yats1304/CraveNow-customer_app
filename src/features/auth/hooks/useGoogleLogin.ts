import { ENV } from "@/config/env";
import { syncSession } from "@/features/helper/auth.helper";
import { authStorage } from "@/services/storage";
import { useAppDispatch } from "@/store/hooks";
import { logger, showToast } from "@/utils";
import { getOrCreateDeviceId } from "@/utils/device";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
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
    logger.info("GoogleLogin", "Triggering native Google Sign-In picker");
    setError(null);
    setIsPending(true);
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      const idToken = response.data?.idToken;

      if (!idToken) {
        logger.error(
          "GoogleLogin",
          "No ID token returned from Google SDK",
          response,
        );
        throw new Error("No ID token received from Google.");
      }

      logger.info(
        "GoogleLogin",
        "Google ID token received, authenticating with backend API",
      );

      const deviceId = getOrCreateDeviceId();
      const apiResponse = await authApi.googleLogin({ idToken, deviceId });
      const { user, accessToken, refreshToken } = apiResponse.data;

      logger.info("GoogleLogin", "Backend authentication successful", {
        email: user?.email,
      });

      authStorage.saveSession({ user, accessToken, refreshToken });
      syncSession(dispatch, apiResponse.data);
      showToast.success("Signed in with Google successfully.");
      router.replace("/(protected)/home" as any);
    } catch (err: any) {
      if (err.code === "SIGN_IN_CANCELLED") {
        logger.info("GoogleLogin", "User cancelled Google Sign-In picker");
      } else {
        const errorMsg =
          err?.response?.data?.message ||
          err?.message ||
          "Google Sign-In failed. Please try again.";

        logger.error("GoogleLogin", "Google Sign-In error occurred", err);
        setError(errorMsg);
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
