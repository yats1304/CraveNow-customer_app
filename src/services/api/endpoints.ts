const AUTH = "/auth";

export const AUTH_ENDPOINTS = {
  AUTH: {
    LOGIN: `${AUTH}/login`,
    SIGNUP: `${AUTH}/signup`,
    LOGOUT: `${AUTH}/logout`,
    REFRESH_TOKEN: `${AUTH}/refresh-token`,
    ME: `${AUTH}/me`,
    FORGOT_PASSWORD: `${AUTH}/forgot-password`,
    RESET_PASSWORD: `${AUTH}/reset-password`,
  },
} as const;
