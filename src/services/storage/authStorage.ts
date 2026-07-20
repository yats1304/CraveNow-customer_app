import { STORAGE_KEYS } from "@/constants";
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

  clearTokens() {
    storage.remove(STORAGE_KEYS.ACCESS_TOKEN);
    storage.remove(STORAGE_KEYS.REFRESH_TOKEN);
  },
};
