import { AppProvider } from "@/providers/AppProvider";
import { setupInterceptors } from "@/services/api";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";
import "../../global.css";

export default function RootLayout() {
  useEffect(() => {
    setupInterceptors();
    SplashScreen.hideAsync().catch(() => {});
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </AppProvider>
    </GestureHandlerRootView>
  );
}
