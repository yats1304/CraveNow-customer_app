import { authStorage } from "@/services/storage";
import { logger } from "@/utils";

export const splashService = {
  /**
   * Preloads necessary application configurations and validates the active session.
   * Returns true if session is valid, false otherwise.
   */
  async preloadAppData(): Promise<boolean> {
    logger.info("SplashService", "Executing preloadAppData sequence");
    try {
      const authenticated = authStorage.isAuthenticated();
      if (authenticated) {
        logger.info("SplashService", "User is authenticated during splash preloading");
        return true;
      }
      logger.info("SplashService", "User is not authenticated during splash preloading");
      return false;
    } catch (error) {
      logger.warn("SplashService", "Failed to preload app data during splash, clearing tokens", error);
      authStorage.clearTokens();
      return false;
    }
  },
};
