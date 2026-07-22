import { useMutation } from "@tanstack/react-query";
import { authService } from "../services";
import type { ResetPasswordRequest } from "../types";

export function useResetPassword() {
  return useMutation({
    mutationFn: (data: ResetPasswordRequest) => authService.resetPassword(data),
  });
}
