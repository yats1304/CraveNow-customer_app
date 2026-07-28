import { authStorage } from "@/services/storage";
import { logger } from "@/utils";
import { refreshApi } from "./axios";
import { AUTH_ENDPOINTS } from "./endpoints";

export async function refreshAccessToken() {
  const refreshToken = authStorage.getRefreshToken();

  if (!refreshToken) {
    logger.warn("RefreshService", "Refresh token missing in storage");
    throw new Error("Refresh token missing");
  }

  delete refreshApi.defaults.headers.common.Authorization;

  logger.info("RefreshService", "Sending token refresh HTTP request");

  const response = await refreshApi.post(AUTH_ENDPOINTS.AUTH.REFRESH_TOKEN, {
    refreshToken,
  });

  const { user, tokens } = response.data.data;

  logger.info(
    "RefreshService",
    "New session tokens received and saved to storage",
    { userId: user?._id },
  );

  authStorage.saveSession({
    user,
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
  });

  return tokens.accessToken;
}
