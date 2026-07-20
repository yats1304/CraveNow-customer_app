import z from "zod";
import { UserRole } from "../types/auth.types";
import {
  deviceIdSchema,
  emailSchema,
  otpSchema,
  passwordSchema,
  phoneSchema,
} from "./common.schema";

// Register schema
export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name cannot exceed 50 characters"),

  email: emailSchema,

  password: passwordSchema,

  phone: phoneSchema,

  role: z.literal(UserRole.CUSTOMER).optional(),
});

// Login
export const loginSchema = z.object({
  email: emailSchema,

  password: passwordSchema,

  deviceId: deviceIdSchema,
});

// Verify OTP
export const verifyOtpSchema = z.object({
  email: emailSchema,

  otp: otpSchema,

  deviceId: deviceIdSchema,
});

// Resend OTP
export const resendOtpSchema = z.object({
  email: emailSchema,
});

// Forgot Password
export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

// Reset Password
export const resetPasswordSchema = z
  .object({
    email: emailSchema,

    otp: otpSchema,

    password: passwordSchema,

    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

// Refresh Token
export const refreshTokenSchema = z.object({
  deviceId: deviceIdSchema,
});

// Logout
export const logoutSchema = z.object({
  deviceId: deviceIdSchema,
});

// Google Login
export const googleLoginSchema = z.object({
  idToken: z.string().min(1, "Google ID Token is required"),
  deviceId: deviceIdSchema,
});

// Change Password
export const changePasswordSchema = z
  .object({
    currentPassword: passwordSchema,
    newPassword: passwordSchema,
    deviceId: deviceIdSchema,
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    path: ["newPassword"],
    message: "New password cannot be the same as current password.",
  });
