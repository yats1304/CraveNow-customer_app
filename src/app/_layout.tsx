import { Toast } from "@/components/ui/Toast";
import { AuthGate } from "@/features/auth";
import { AppProvider } from "@/providers/AppProvider";
import { setupInterceptors } from "@/services/api";
import { registerToastRef } from "@/utils";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "../../global.css";

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  useEffect(() => {
    setupInterceptors();
  }, []);

  return (
    <AppProvider>
      <AuthGate>
        <Slot />
      </AuthGate>
      <Toast ref={registerToastRef} />
    </AppProvider>
  );
}
