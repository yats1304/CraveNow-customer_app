import { syncSession } from "@/features/helper/auth.helper";
import { useAppDispatch } from "@/store/hooks";
import { useMutation } from "@tanstack/react-query";
import { authService } from "../services";

export function useLogin() {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: authService.login,

    onSuccess(data) {
      syncSession(dispatch, data);
    },
  });
}
