import { Toast } from "@/components/ui/Toast";
import { AuthGate } from "@/features/auth";
import { AppProvider } from "@/providers/AppProvider";
import { registerToastRef } from "@/utils";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "../../global.css";

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  return (
    <AppProvider>
      <AuthGate>
        <Slot />
      </AuthGate>
      <Toast ref={registerToastRef} />
    </AppProvider>
  );
}
