export enum UserRole {
  CUSTOMER = "CUSTOMER",
}

export enum AuthProvider {
  LOCAL = "LOCAL",
  GOOGLE = "GOOGLE",
}

export enum AccountStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
}

export interface User {
  _id: string;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  avatar?: string;
  googleId?: string;
  provider?: AuthProvider;
  role: UserRole;
  status: AccountStatus;
  refreshToken?: string;
  totalOrders?: number;
  lastOrderDate?: Date;
  lifetimeSpend?: number;
  averageOrderValue?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthPayload {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  deviceId: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
  deviceId: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  email: string;
  otp: string;
  password: string;
}

export interface RefreshTokenRequest {
  deviceId: string;
}

export interface LogoutRequest {
  deviceId: string;
}

export interface GoogleLoginRequest {
  idToken: string;
  deviceId: string;
}
export interface ResendOtpRequest {
  email: string;
}

export interface ChangePasswordRequest {
  currentPassword?: string;
  newPassword?: string;
  deviceId?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user: User;
  accessToken: string;
  refreshToken: string;
}
