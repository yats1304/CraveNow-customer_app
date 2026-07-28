import { logger } from "@/utils";
import { useMutation } from "@tanstack/react-query";
import { authService } from "../services";
import type { ResetPasswordRequest } from "../types";

export function useResetPassword() {
  return useMutation({
    mutationFn: (data: ResetPasswordRequest) => authService.resetPassword(data),

    onSuccess() {
      logger.info("useResetPassword", "Reset password mutation succeeded");
    },

    onError(error) {
      logger.error("useResetPassword", "Reset password mutation failed", error);
    },
  });
}
