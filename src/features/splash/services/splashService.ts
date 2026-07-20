import { authStorage } from "@/services/storage";

export const splashService = {
  /**
   * Preloads necessary application configurations and validates the active session.
   * Returns true if session is valid, false otherwise.
   */
  async preloadAppData(): Promise<boolean> {
    try {
      const authenticated = authStorage.isAuthenticated();
      if (authenticated) {
        // Pre-fetch profile/configs during splash
        // e.g. await apiClient.get(AUTH_ENDPOINTS.AUTH.ME);
        return true;
      }
      return false;
    } catch (error) {
      console.warn("Failed to preload app data during splash:", error);
      // Clear tokens if validation fails (e.g. token expired/invalid)
      authStorage.clearTokens();
      return false;
    }
  },
};
