import { useMutation } from "@tanstack/react-query";
import { authService } from "../services";

export function useRefreshToken() {
  return useMutation({
    mutationFn: authService.refreshToken,
  });
}
