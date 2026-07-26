import { Toast } from "@/components/ui/Toast";
import { AuthGate } from "@/features/auth";
import { clearSession } from "@/features/auth/redux/authSlice";
import { AppProvider } from "@/providers/AppProvider";
import { setupInterceptors } from "@/services/api";
import { authEvents } from "@/services/api/authEvents";
import { useAppDispatch } from "@/store/hooks";
import { registerToastRef, showToast } from "@/utils";
import { router, Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "../../global.css";

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    setupInterceptors();

    const unsubscribe = authEvents.on("sessionExpired", () => {
      dispatch(clearSession());
      showToast.error("Your session has expired. Please log in again.");
      router.replace("/(auth)/login");
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <AppProvider>
      <AuthGate>
        <Slot />
      </AuthGate>
      <Toast ref={registerToastRef} />
    </AppProvider>
  );
}
