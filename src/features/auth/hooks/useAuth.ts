import { useAppSelector } from "@/store/hooks";

import { selectAuth } from "../redux/authSelectors";
import type { AuthState } from "../redux/authSlice";

export function useAuth(): AuthState {
  return useAppSelector(selectAuth);
}
