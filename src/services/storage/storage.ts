let nativeStorage: any = null;

// only for development purpose

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { MMKV } = require("react-native-mmkv");
  nativeStorage = new MMKV({
    id: "cravenow-storage",
  });
} catch {
  console.warn(
    "MMKV native module not found (running in Expo Go or Web). Falling back to in-memory mock storage.",
  );
}

// In-memory fallback map for Expo Go / Web compatibility (keeps synchronous APIs)
const memoryStorage = new Map<string, string | boolean | number>();

export const storage = {
  getString(key: string): string | undefined {
    if (nativeStorage) {
      try {
        return nativeStorage.getString(key);
      } catch {
        // Fallback to memory if runtime call fails
      }
    }
    const val = memoryStorage.get(key);
    return typeof val === "string" ? val : undefined;
  },

  set(key: string, value: string | boolean | number): void {
    if (nativeStorage) {
      try {
        nativeStorage.set(key, value);
        return;
      } catch {
        // Fallback to memory if runtime call fails
      }
    }
    memoryStorage.set(key, value);
  },

  delete(key: string): void {
    if (nativeStorage) {
      try {
        nativeStorage.delete(key);
        return;
      } catch {
        // Fallback to memory if runtime call fails
      }
    }
    memoryStorage.delete(key);
  },

  remove(key: string): void {
    if (nativeStorage) {
      try {
        nativeStorage.remove(key);
        return;
      } catch {
        // Fallback to memory if runtime call fails
      }
    }
    memoryStorage.delete(key);
  },

  clearAll(): void {
    if (nativeStorage) {
      try {
        nativeStorage.clearAll();
        return;
      } catch {
        // Fallback to memory if runtime call fails
      }
    }
    memoryStorage.clear();
  },

  getBoolean(key: string): boolean | undefined {
    if (nativeStorage) {
      try {
        return nativeStorage.getBoolean(key);
      } catch {
        // Fallback to memory if runtime call fails
      }
    }
    const val = memoryStorage.get(key);
    return typeof val === "boolean" ? val : undefined;
  },

  getNumber(key: string): number | undefined {
    if (nativeStorage) {
      try {
        return nativeStorage.getNumber(key);
      } catch {
        // Fallback to memory if runtime call fails
      }
    }
    const val = memoryStorage.get(key);
    return typeof val === "number" ? val : undefined;
  },
};
