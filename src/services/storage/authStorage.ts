import { STORAGE_KEYS } from "@/constants";
import { User, AuthPayload } from "@/features/auth/types";
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
    const value = storage.getString(STORAGE_KEYS.USER);
    return value ? JSON.parse(value) : null;
  },

  setUser(user: User) {
    storage.set(STORAGE_KEYS.USER, JSON.stringify(user));
  },

  removeUser() {
    storage.remove(STORAGE_KEYS.USER);
  },

  saveSession(payload: AuthPayload) {
    authStorage.setAccessToken(payload.accessToken);
    authStorage.setRefreshToken(payload.refreshToken);
    authStorage.setUser(payload.user);
  },

  getSession(): AuthPayload | null {
    const accessToken = authStorage.getAccessToken();
    const refreshToken = authStorage.getRefreshToken();
    const user = authStorage.getUser();

    if (!accessToken || !refreshToken || !user) {
      return null;
    }

    return {
      accessToken,
      refreshToken,
      user,
    };
  },

  clearTokens() {
    storage.remove(STORAGE_KEYS.ACCESS_TOKEN);
    storage.remove(STORAGE_KEYS.REFRESH_TOKEN);
  },

  clearSession() {
    storage.remove(STORAGE_KEYS.ACCESS_TOKEN);
    storage.remove(STORAGE_KEYS.REFRESH_TOKEN);
    storage.remove(STORAGE_KEYS.USER);
  },
};
