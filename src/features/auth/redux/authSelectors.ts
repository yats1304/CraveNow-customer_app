import type { RootState } from "../../../store/store";
import type { User } from "../types";
import type { AuthState } from "./authSlice";

export const selectAuth = (state: RootState): AuthState => state.auth;

export const selectUser = (state: RootState): User | null => state.auth.user;

export const selectCurrentUser = (state: RootState): User | null =>
  state.auth.user;

export const selectIsAuthenticated = (state: RootState): boolean =>
  state.auth.isAuthenticated;

export const selectIsLoading = (state: RootState): boolean =>
  state.auth.isLoading;
