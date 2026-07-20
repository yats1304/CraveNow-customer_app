import { AppProvider } from "@/providers/AppProvider";
import { AuthGate } from "@/features/auth";
import { setupInterceptors } from "@/services/api";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../../global.css";

// Prevent the splash screen from auto-hiding before session restoration finishes.
SplashScreen.preventAutoHideAsync().catch(() => {});

/**
 * RootLayout sets up the application's root providers, routing environment,
 * and passes render control to AuthGate.
 */
export default function RootLayout() {
  useEffect(() => {
    setupInterceptors();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProvider>
        <AuthGate>
          <Slot />
        </AuthGate>
      </AppProvider>
    </GestureHandlerRootView>
  );
}
