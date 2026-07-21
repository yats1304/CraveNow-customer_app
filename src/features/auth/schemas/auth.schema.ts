import z from "zod";

import {
  emailSchema,
  otpSchema,
  passwordSchema,
  phoneSchema,
  deviceIdSchema,
} from "./common.schema";

// Register schema (client-side form shape — deviceId not needed by /auth/register)
export const registerSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name cannot exceed 50 characters"),

    email: emailSchema,

    phone: phoneSchema,

    password: passwordSchema,

    confirmPassword: z.string().min(1, "Please confirm your password"),

    acceptTerms: z
      .boolean()
      .refine((val) => val === true, "You must accept the Terms & Privacy Policy"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
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
