import { logger } from "@/utils";
import { useMutation } from "@tanstack/react-query";
import { authService } from "../services";

export function useForgotPassword() {
  return useMutation({
    mutationFn: authService.forgotPassword,

    onSuccess() {
      logger.info("useForgotPassword", "Forgot password mutation succeeded");
    },

    onError(error) {
      logger.error("useForgotPassword", "Forgot password mutation failed", error);
    },
  });
}
