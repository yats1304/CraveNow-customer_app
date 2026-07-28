import { clearSession } from "@/features/auth/redux/authSlice";
import { setupInterceptors } from "@/services/api";
import { authEvents } from "@/services/api/authEvents";
import { useAppDispatch } from "@/store/hooks";
import { logger, showToast } from "@/utils";
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
    logger.info("AuthGate", "Initializing Axios interceptors and session listener");
    setupInterceptors();

    const unsubscribe = authEvents.on("sessionExpired", () => {
      logger.warn("AuthGate", "Handling sessionExpired event: clearing Redux and navigating to login");
      dispatch(clearSession());
      showToast.error("Your session has expired. Please log in again.");
      router.replace("/(auth)/login");
    });

    return unsubscribe;
  }, [dispatch]);

  useEffect(() => {
    if (!isLoading) {
      logger.info("AuthGate", "App session restoration completed, hiding Expo splash screen");
      SplashScreen.hideAsync().catch((err) => {
        logger.warn("AuthGate", "Failed to hide splash screen", err);
      });
    }
  }, [isLoading]);

  if (isLoading) {
    return null;
  }

  return <>{children}</>;
}
