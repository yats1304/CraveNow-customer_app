import { useMutation } from "@tanstack/react-query";
import { authService } from "../services";
import type { ResendOtpRequest } from "../types";

export function useResendOtp(purpose?: "signup" | "reset-password") {
  return useMutation({
    mutationFn: (data: ResendOtpRequest) =>
      purpose === "reset-password"
        ? authService.resendForgotPasswordOtp(data)
        : authService.resendOtp(data),
  });
}
