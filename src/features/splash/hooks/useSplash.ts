import { appStorage, authStorage } from "@/services/storage";
import { logger } from "@/utils";
import { router } from "expo-router";
import { useEffect } from "react";
import { SPLASH } from "../constants";
import { splashService } from "../services/splashService";

export function useSplash(): void {
  useEffect(() => {
    let active = true;

    const initializeApp = async () => {
      logger.info("Splash", "Starting app splash initialization sequence");
      const startTime = Date.now();
      let isValidSession = false;

      // 1. Perform background initialization & session validation
      if (authStorage.isAuthenticated()) {
        logger.info(
          "Splash",
          "User authenticated in storage, preloading app data",
        );
        isValidSession = await splashService.preloadAppData();
      } else {
        logger.info("Splash", "No saved session found in storage");
      }

      // 2. Calculate remaining duration to guarantee SPLASH.DURATION visibility
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, SPLASH.DURATION - elapsed);

      setTimeout(() => {
        if (!active) return;

        const isFirst = appStorage.isFirstLaunch();

        if (isFirst ?? true) {
          logger.info(
            "Splash",
            "First launch detected, navigating to Onboarding",
          );
          router.replace("/(public)/onboarding");
        } else if (isValidSession) {
          logger.info(
            "Splash",
            "Valid session confirmed, navigating to Protected area",
          );
          router.replace("/(protected)/home" as any);
        } else {
          logger.info("Splash", "No valid session, navigating to Login");
          router.replace("/(auth)/login");
        }
      }, remainingTime);
    };

    initializeApp().catch((err) => {
      logger.error(
        "Splash",
        "Critical error during app startup initialization",
        err,
      );
      if (active) {
        router.replace("/(auth)/login");
      }
    });

    return () => {
      active = false;
    };
  }, []);
}
