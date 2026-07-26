import { authStorage } from "@/services/storage";
import { getOrCreateDeviceId } from "@/utils/device";
import { authApi } from "../api";
import { getGoogleIdToken } from "../utils";

import type {
  ForgotPasswordRequest,
  GoogleLoginRequest,
  LoginRequest,
  LogoutRequest,
  RefreshTokenRequest,
  RegisterRequest,
  ResendOtpRequest,
  ResetPasswordRequest,
  VerifyOtpRequest,
} from "../types";

export const authService = {
  async login(data: LoginRequest) {
    const response = await authApi.login(data);
    const { user, accessToken, refreshToken } = response.data;

    authStorage.saveSession({
      user,
      accessToken,
      refreshToken,
    });

    return response.data;
  },

  async register(data: RegisterRequest) {
    const { fullName, email, password, phone } = data;
    const response = await authApi.register({
      name: fullName,
      email,
      password,
      ...(phone ? { phone } : {}),
    } as any);
    return response.data;
  },

  async verifyOtp(data: VerifyOtpRequest) {
    const response = await authApi.verifyOtp(data);
    const { user, accessToken, refreshToken } = response.data;

    authStorage.saveSession({
      user,
      accessToken,
      refreshToken,
    });

    return response.data;
  },

  async resendOtp(data: ResendOtpRequest) {
    const response = await authApi.resendOtp(data);
    return response.data;
  },

  async resendForgotPasswordOtp(data: ResendOtpRequest) {
    const response = await authApi.resendForgotPasswordOtp(data);
    return response.data;
  },

  async forgotPassword(data: ForgotPasswordRequest) {
    const response = await authApi.forgotPassword(data);
    return response.data;
  },

  async resetPassword(data: ResetPasswordRequest) {
    const response = await authApi.resetPassword(data);
    return response.data;
  },

  async refreshToken(data: RefreshTokenRequest) {
    const response = await authApi.refreshToken(data);
    const { accessToken, refreshToken } = response.data;
    const currentSession = authStorage.getSession();

    authStorage.saveSession({
      user: currentSession?.user || (null as any),
      accessToken,
      refreshToken,
    });

    return response.data;
  },

  async logout(data: LogoutRequest) {
    try {
      await authApi.logout(data);
    } finally {
      authStorage.clearSession();
    }
  },

  async googleLogin(data?: GoogleLoginRequest) {
    const idToken = data?.idToken || (await getGoogleIdToken());
    const deviceId = data?.deviceId || getOrCreateDeviceId();

    const response = await authApi.googleLogin({ idToken, deviceId });
    const { user, accessToken, refreshToken } = response.data;

    authStorage.saveSession({
      user,
      accessToken,
      refreshToken,
    });

    return response.data;
  },

  async restoreSession() {
    return authStorage.getSession();
  },

  clearSession() {
    authStorage.clearSession();
  },
};
