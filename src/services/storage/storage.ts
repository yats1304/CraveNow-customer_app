import { createMMKV } from "react-native-mmkv";

export const mmkv = createMMKV({
  id: "cravenow-storage",
});

export const storage = {
  getString: (key: string) => mmkv.getString(key),
  set: (key: string, value: string | boolean | number) => mmkv.set(key, value),
  delete: (key: string) => mmkv.remove(key),
  remove: (key: string) => mmkv.remove(key),
  clearAll: () => mmkv.clearAll(),
  getBoolean: (key: string) => mmkv.getBoolean(key),
  getNumber: (key: string) => mmkv.getNumber(key),
  contains: (key: string) => mmkv.contains(key),
  getAllKeys: () => mmkv.getAllKeys(),
};
