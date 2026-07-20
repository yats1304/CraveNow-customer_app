import { appStorage, authStorage } from "@/services/storage";
import { router } from "expo-router";
import { useEffect } from "react";
import { SPLASH } from "../constants";
import { splashService } from "../services/splashService";

export function useSplash(): void {
  useEffect(() => {
    let active = true;

    const initializeApp = async () => {
      const startTime = Date.now();
      let isValidSession = false;

      // 1. Perform background initialization & session validation
      if (authStorage.isAuthenticated()) {
        isValidSession = await splashService.preloadAppData();
      }

      // 2. Calculate remaining duration to guarantee SPLASH.DURATION visibility
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, SPLASH.DURATION - elapsed);

      setTimeout(() => {
        if (!active) return;

        const isFirst = appStorage.isFirstLaunch();

        if (isFirst ?? true) {
          router.replace("/(public)/onboarding");
        } else if (isValidSession) {
          router.replace("/(tabs)");
        } else {
          router.replace("/(auth)/login");
        }
      }, remainingTime);
    };

    initializeApp().catch((err) => {
      console.error("Critical error during app startup initialization:", err);
      if (active) {
        router.replace("/(auth)/login");
      }
    });

    return () => {
      active = false;
    };
  }, []);
}
