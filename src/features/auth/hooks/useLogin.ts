import { syncSession } from "@/features/helper/auth.helper";
import { useAppDispatch } from "@/store/hooks";
import { logger } from "@/utils";
import { useMutation } from "@tanstack/react-query";
import { authService } from "../services";

export function useLogin() {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: authService.login,

    onSuccess(data) {
      logger.info("useLogin", "Login mutation succeeded, syncing session to Redux");
      syncSession(dispatch, data);
    },

    onError(error) {
      logger.error("useLogin", "Login mutation failed", error);
    },
  });
}
