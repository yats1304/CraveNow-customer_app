import { STORAGE_KEYS } from "@/constants";
import { storage } from "./storage";

export const appStorage = {
  isFirstLaunch() {
    return storage.getBoolean(STORAGE_KEYS.FIRST_LAUNCH);
  },

  completeOnboarding() {
    storage.set(STORAGE_KEYS.FIRST_LAUNCH, false);
  },

  getTheme() {
    return storage.getString(STORAGE_KEYS.THEME);
  },

  setTheme(theme: "light" | "dark" | "system") {
    storage.set(STORAGE_KEYS.THEME, theme);
  },
};
