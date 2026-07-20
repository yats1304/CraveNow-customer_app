import { useAppDispatch } from "@/store/hooks";
import { useQuery } from "@tanstack/react-query";
import { authKeys } from "../api/auth.keys";
import { clearSession, restoreSession } from "../redux/authSlice";
import { authService } from "../services";

export function useRestoreSession() {
  const dispatch = useAppDispatch();

  return useQuery({
    queryKey: authKeys.session(),

    queryFn: async () => {
      try {
        const session = await authService.restoreSession();
        if (!session) {
          dispatch(clearSession());
          return null;
        }
        dispatch(restoreSession(session));
        return session;
      } catch (error) {
        dispatch(clearSession());
        throw error;
      }
    },

    retry: false,
    staleTime: Infinity,
    gcTime: Infinity,
  });
}
