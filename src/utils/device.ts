import { STORAGE_KEYS } from "@/constants";
import { storage } from "@/services/storage/storage";

export function getOrCreateDeviceId(): string {
  let deviceId = storage.getString(STORAGE_KEYS.DEVICE_ID);
  if (!deviceId) {
    deviceId = `dev_${Math.random().toString(36).substring(2, 15)}_${Date.now().toString(36)}`;
    storage.set(STORAGE_KEYS.DEVICE_ID, deviceId);
  }
  return deviceId;
}
