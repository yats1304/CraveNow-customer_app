import { apiClient, AUTH_ENDPOINTS } from "@/services/api";

import {
  AuthResponse,
  ChangePasswordRequest,
  ForgotPasswordRequest,
  GoogleLoginRequest,
  LoginRequest,
  LogoutRequest,
  RefreshTokenRequest,
  RegisterRequest,
  ResendOtpRequest,
  ResetPasswordRequest,
  VerifyOtpRequest,
} from "../types/auth.types";

export const authApi = {
  login(data: LoginRequest) {
    return apiClient.post<AuthResponse>(AUTH_ENDPOINTS.AUTH.LOGIN, data);
  },

  register(data: RegisterRequest) {
    return apiClient.post<AuthResponse>(AUTH_ENDPOINTS.AUTH.SIGNUP, data);
  },

  verifyOtp(data: VerifyOtpRequest) {
    return apiClient.post<AuthResponse>(AUTH_ENDPOINTS.AUTH.VERIFY_OTP, data);
  },

  resendOtp(data: ResendOtpRequest) {
    return apiClient.post<{ success: boolean; message: string }>(
      AUTH_ENDPOINTS.AUTH.RESEND_OTP,
      data,
    );
  },

  resendForgotPasswordOtp(data: ResendOtpRequest) {
    return apiClient.post<{ success: boolean; message: string }>(
      AUTH_ENDPOINTS.AUTH.RESEND_FORGOT_PASSWORD_OTP,
      data,
    );
  },

  forgotPassword(data: ForgotPasswordRequest) {
    return apiClient.post<{ success: boolean; message: string }>(
      AUTH_ENDPOINTS.AUTH.FORGOT_PASSWORD,
      data,
    );
  },

  resetPassword(data: ResetPasswordRequest) {
    return apiClient.post<{ success: boolean; message: string }>(
      AUTH_ENDPOINTS.AUTH.RESET_PASSWORD_OTP,
      data,
    );
  },

  changePassword(data: ChangePasswordRequest) {
    return apiClient.post<{ success: boolean; message: string }>(
      AUTH_ENDPOINTS.AUTH.CHANGE_PASSWORD,
      data,
    );
  },

  refreshToken(data: RefreshTokenRequest) {
    return apiClient.post<AuthResponse>(
      AUTH_ENDPOINTS.AUTH.REFRESH_TOKEN,
      data,
    );
  },

  logout(data: LogoutRequest) {
    return apiClient.post(AUTH_ENDPOINTS.AUTH.LOGOUT, data);
  },

  googleLogin(data: GoogleLoginRequest) {
    return apiClient.post<AuthResponse>(AUTH_ENDPOINTS.AUTH.GOOGLE_LOGIN, data);
  },

  getMe() {
    return apiClient.get<AuthResponse>(AUTH_ENDPOINTS.AUTH.ME);
  },
};
