import { syncSession } from "@/features/helper/auth.helper";
import { useAppDispatch } from "@/store/hooks";
import { logger } from "@/utils";
import { useMutation } from "@tanstack/react-query";
import { authService } from "../services";

export function useVerifyOtp() {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: authService.verifyOtp,

    onSuccess(data) {
      logger.info("useVerifyOtp", "OTP verification mutation succeeded");
      syncSession(dispatch, data);
    },

    onError(error) {
      logger.error("useVerifyOtp", "OTP verification mutation failed", error);
    },
  });
}
