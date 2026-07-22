const AUTH = "/auth";

export const AUTH_ENDPOINTS = {
  AUTH: {
    LOGIN: `${AUTH}/login`,
    GOOGLE_LOGIN: `${AUTH}/google`,
    SIGNUP: `${AUTH}/register`,
    LOGOUT: `${AUTH}/logout`,
    REFRESH_TOKEN: `${AUTH}/refresh`,
    VERIFY_OTP: `${AUTH}/verify-otp`,
    RESEND_OTP: `${AUTH}/resend-otp`,
    RESEND_FORGOT_PASSWORD_OTP: `${AUTH}/resend-forgot-password-otp`,
    ME: `${AUTH}/me`,
    FORGOT_PASSWORD: `${AUTH}/forgot-password`,
    RESET_PASSWORD_OTP: `${AUTH}/reset-password`,
    CHANGE_PASSWORD: `${AUTH}/change-password`,
  },
} as const;
