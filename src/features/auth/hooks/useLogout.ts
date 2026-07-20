import { useAppDispatch } from "@/store/hooks";
import { useMutation } from "@tanstack/react-query";
import { clearSession } from "../redux/authSlice";
import { authService } from "../services";

export function useLogout() {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: authService.logout,

    onSuccess() {
      dispatch(clearSession());
    },
  });
}
