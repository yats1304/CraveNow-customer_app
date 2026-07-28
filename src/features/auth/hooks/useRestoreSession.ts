import { useAppDispatch } from "@/store/hooks";
import { logger } from "@/utils";
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
        logger.info("RestoreSession", "Querying local MMKV session storage");
        const session = await authService.restoreSession();
        if (!session) {
          logger.info("RestoreSession", "No valid session found, clearing Redux auth state");
          dispatch(clearSession());
          return null;
        }
        logger.info("RestoreSession", "Session restored successfully", { email: session.user?.email });
        dispatch(restoreSession(session));
        return session;
      } catch (error) {
        logger.error("RestoreSession", "Session restoration encountered an error, clearing state", error);
        dispatch(clearSession());
        throw error;
      }
    },

    retry: false,
    staleTime: Infinity,
    gcTime: Infinity,
  });
}
