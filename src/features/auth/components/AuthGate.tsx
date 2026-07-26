import { clearSession } from "@/features/auth/redux/authSlice";
import { setupInterceptors } from "@/services/api";
import { authEvents } from "@/services/api/authEvents";
import { useAppDispatch } from "@/store/hooks";
import { showToast } from "@/utils";
import { router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { ReactNode, useEffect } from "react";
import { useRestoreSession } from "../hooks/useRestoreSession";

interface AuthGateProps {
  children: ReactNode;
}

export function AuthGate({ children }: AuthGateProps) {
  const dispatch = useAppDispatch();
  const { isLoading } = useRestoreSession();

  useEffect(() => {
    setupInterceptors();

    const unsubscribe = authEvents.on("sessionExpired", () => {
      dispatch(clearSession());
      showToast.error("Your session has expired. Please log in again.");
      router.replace("/(auth)/login");
    });

    return unsubscribe;
  }, [dispatch]);

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hideAsync().catch(() => {});
    }
  }, [isLoading]);

  if (isLoading) {
    return null;
  }

  return <>{children}</>;
}
