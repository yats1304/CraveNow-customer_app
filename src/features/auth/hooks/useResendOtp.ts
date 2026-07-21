import { useMutation } from "@tanstack/react-query";
import { authService } from "../services";

export function useResendOtp() {
  return useMutation({
    mutationFn: authService.resendOtp,
  });
}
