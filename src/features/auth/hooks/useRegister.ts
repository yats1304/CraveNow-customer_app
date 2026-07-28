import { logger } from "@/utils";
import { useMutation } from "@tanstack/react-query";
import { authService } from "../services";

export function useRegister() {
  return useMutation({
    mutationFn: authService.register,

    onSuccess() {
      logger.info("useRegister", "Registration mutation completed successfully");
    },

    onError(error) {
      logger.error("useRegister", "Registration mutation failed", error);
    },
  });
}
