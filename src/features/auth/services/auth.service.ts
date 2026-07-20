import { authStorage } from "@/services/storage";
import { authApi } from "../api";

import type {
  ForgotPasswordRequest,
  GoogleLoginRequest,
  LoginRequest,
  LogoutRequest,
  RefreshTokenRequest,
  RegisterRequest,
  ResetPasswordRequest,
  VerifyOtpRequest,
} from "../types";

export const authService = {
  async login(data: LoginRequest) {
    const response = await authApi.login(data);

    const { user, tokens } = response.data.data;

    authStorage.saveSession({
      user,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });

    return response.data;
  },

  async register(data: RegisterRequest) {
    const response = await authApi.register(data);

    return response.data;
  },

  async verifyOtp(data: VerifyOtpRequest) {
    const response = await authApi.verifyOtp(data);

    const { user, tokens } = response.data.data;

    authStorage.saveSession({
      user,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });

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

    const { user, tokens } = response.data.data;

    authStorage.saveSession({
      user,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
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

  async googleLogin(data: GoogleLoginRequest) {
    const response = await authApi.googleLogin(data);

    const { user, tokens } = response.data.data;

    authStorage.saveSession({
      user,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
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
