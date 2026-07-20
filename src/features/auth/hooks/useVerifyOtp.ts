import { syncSession } from "@/features/helper/auth.helper";
import { useAppDispatch } from "@/store/hooks";
import { useMutation } from "@tanstack/react-query";
import { authService } from "../services";

export function useVerifyOtp() {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: authService.verifyOtp,

    onSuccess(data) {
      syncSession(dispatch, data);
    },
  });
}
