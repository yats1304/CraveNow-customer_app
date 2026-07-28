import { useAppDispatch } from "@/store/hooks";
import { logger } from "@/utils";
import { useMutation } from "@tanstack/react-query";
import { clearSession } from "../redux/authSlice";
import { authService } from "../services";

export function useLogout() {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: authService.logout,

    onSuccess() {
      logger.info("useLogout", "Logout mutation succeeded, clearing Redux state");
      dispatch(clearSession());
    },

    onError(error) {
      logger.warn("useLogout", "Logout request returned error, clearing local Redux state regardless", error);
      dispatch(clearSession());
    },
  });
}
