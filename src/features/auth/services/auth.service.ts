import { authStorage } from "@/services/storage";
import { logger } from "@/utils";
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
    logger.info("AuthService", "Executing user login request", {
      email: data.email,
    });
    try {
      const response = await authApi.login(data);
      const { user, accessToken, refreshToken } = response.data;

      logger.info("AuthService", "Login successful, saving session", {
        userId: user?._id,
      });

      authStorage.saveSession({
        user,
        accessToken,
        refreshToken,
      });

      return response.data;
    } catch (error) {
      logger.error("AuthService", "Login request failed", error);
      throw error;
    }
  },

  async register(data: RegisterRequest) {
    logger.info("AuthService", "Executing user registration request", {
      email: data.email,
    });
    try {
      const { fullName, email, password, phone } = data;
      const response = await authApi.register({
        name: fullName,
        email,
        password,
        ...(phone ? { phone } : {}),
      } as any);

      logger.info("AuthService", "Registration request successful", { email });
      return response.data;
    } catch (error) {
      logger.error("AuthService", "Registration request failed", error);
      throw error;
    }
  },

  async verifyOtp(data: VerifyOtpRequest) {
    logger.info("AuthService", "Executing OTP verification request", {
      email: data.email,
    });
    try {
      const response = await authApi.verifyOtp(data);
      const { user, accessToken, refreshToken } = response.data;

      logger.info(
        "AuthService",
        "OTP verification successful, saving session",
        { userId: user?._id },
      );

      authStorage.saveSession({
        user,
        accessToken,
        refreshToken,
      });

      return response.data;
    } catch (error) {
      logger.error("AuthService", "OTP verification failed", error);
      throw error;
    }
  },

  async resendOtp(data: ResendOtpRequest) {
    logger.info("AuthService", "Executing resend OTP request", {
      email: data.email,
    });
    try {
      const response = await authApi.resendOtp(data);
      return response.data;
    } catch (error) {
      logger.error("AuthService", "Resend OTP request failed", error);
      throw error;
    }
  },

  async resendForgotPasswordOtp(data: ResendOtpRequest) {
    logger.info("AuthService", "Executing resend forgot-password OTP request", {
      email: data.email,
    });
    try {
      const response = await authApi.resendForgotPasswordOtp(data);
      return response.data;
    } catch (error) {
      logger.error(
        "AuthService",
        "Resend forgot-password OTP request failed",
        error,
      );
      throw error;
    }
  },

  async forgotPassword(data: ForgotPasswordRequest) {
    logger.info("AuthService", "Executing forgot password request", {
      email: data.email,
    });
    try {
      const response = await authApi.forgotPassword(data);
      return response.data;
    } catch (error) {
      logger.error("AuthService", "Forgot password request failed", error);
      throw error;
    }
  },

  async resetPassword(data: ResetPasswordRequest) {
    logger.info("AuthService", "Executing reset password request", {
      email: data.email,
    });
    try {
      const response = await authApi.resetPassword(data);
      return response.data;
    } catch (error) {
      logger.error("AuthService", "Reset password request failed", error);
      throw error;
    }
  },

  async refreshToken(data: RefreshTokenRequest) {
    logger.info("AuthService", "Executing refresh token API call");
    try {
      const response = await authApi.refreshToken(data);
      const { accessToken, refreshToken } = response.data;
      const currentSession = authStorage.getSession();

      authStorage.saveSession({
        user: currentSession?.user || (null as any),
        accessToken,
        refreshToken,
      });

      return response.data;
    } catch (error) {
      logger.error("AuthService", "Refresh token API call failed", error);
      throw error;
    }
  },

  async logout(data: LogoutRequest) {
    logger.info("AuthService", "Executing user logout");
    try {
      await authApi.logout(data);
    } catch (error) {
      logger.warn(
        "AuthService",
        "Logout API request returned an error, clearing local session regardless",
        error,
      );
    } finally {
      authStorage.clearSession();
    }
  },

  async googleLogin(data?: GoogleLoginRequest) {
    logger.info("AuthService", "Executing Google login service request");
    try {
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
    } catch (error) {
      logger.error("AuthService", "Google login service request failed", error);
      throw error;
    }
  },

  async restoreSession() {
    logger.info("AuthService", "Restoring user session from local storage");
    return authStorage.getSession();
  },

  clearSession() {
    logger.info("AuthService", "Clearing local auth storage session");
    authStorage.clearSession();
  },
};
