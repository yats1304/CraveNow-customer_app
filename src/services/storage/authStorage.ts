import { STORAGE_KEYS } from "@/constants";
import { User, AuthPayload } from "@/features/auth/types";
import { logger } from "@/utils";
import { storage } from "./storage";

export const authStorage = {
  getAccessToken() {
    return storage.getString(STORAGE_KEYS.ACCESS_TOKEN);
  },

  isAuthenticated() {
    return !!storage.getString(STORAGE_KEYS.ACCESS_TOKEN);
  },

  setAccessToken(token: string) {
    storage.set(STORAGE_KEYS.ACCESS_TOKEN, token);
  },

  removeAccessToken() {
    storage.remove(STORAGE_KEYS.ACCESS_TOKEN);
  },

  getRefreshToken() {
    return storage.getString(STORAGE_KEYS.REFRESH_TOKEN);
  },

  setRefreshToken(token: string) {
    storage.set(STORAGE_KEYS.REFRESH_TOKEN, token);
  },

  removeRefreshToken() {
    storage.remove(STORAGE_KEYS.REFRESH_TOKEN);
  },

  getUser(): User | null {
    try {
      const value = storage.getString(STORAGE_KEYS.USER);
      return value ? JSON.parse(value) : null;
    } catch (err) {
      logger.error("AuthStorage", "Failed to parse user JSON from storage", err);
      return null;
    }
  },

  setUser(user: User) {
    try {
      storage.set(STORAGE_KEYS.USER, JSON.stringify(user));
    } catch (err) {
      logger.error("AuthStorage", "Failed to serialize user JSON for storage", err);
    }
  },

  removeUser() {
    storage.remove(STORAGE_KEYS.USER);
  },

  saveSession(payload: AuthPayload) {
    logger.info("AuthStorage", "Saving session tokens and user data");
    authStorage.setAccessToken(payload.accessToken);
    authStorage.setRefreshToken(payload.refreshToken);
    authStorage.setUser(payload.user);
  },

  getSession(): AuthPayload | null {
    const accessToken = authStorage.getAccessToken();
    const refreshToken = authStorage.getRefreshToken();
    const user = authStorage.getUser();

    if (!accessToken || !refreshToken || !user) {
      logger.debug("AuthStorage", "Session incomplete or missing in MMKV storage");
      return null;
    }

    return {
      accessToken,
      refreshToken,
      user,
    };
  },

  clearTokens() {
    logger.info("AuthStorage", "Clearing access and refresh tokens");
    storage.remove(STORAGE_KEYS.ACCESS_TOKEN);
    storage.remove(STORAGE_KEYS.REFRESH_TOKEN);
  },

  clearSession() {
    logger.info("AuthStorage", "Clearing complete auth session from MMKV");
    storage.remove(STORAGE_KEYS.ACCESS_TOKEN);
    storage.remove(STORAGE_KEYS.REFRESH_TOKEN);
    storage.remove(STORAGE_KEYS.USER);
  },
};
