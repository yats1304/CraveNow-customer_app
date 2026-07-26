import { authStorage } from "@/services/storage";
import { refreshApi } from "./axios";
import { AUTH_ENDPOINTS } from "./endpoints";

export async function refreshAccessToken() {
  const refreshToken = authStorage.getRefreshToken();

  if (!refreshToken) {
    throw new Error("Refresh token missing");
  }

  delete refreshApi.defaults.headers.common.Authorization;

  const response = await refreshApi.post(AUTH_ENDPOINTS.AUTH.REFRESH_TOKEN, {
    refreshToken,
  });
  // backend doesnt send user data so we have to fix it
  const { user, tokens } = response.data.data;

  authStorage.saveSession({
    user,
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
  });

  return tokens.accessToken;
}
