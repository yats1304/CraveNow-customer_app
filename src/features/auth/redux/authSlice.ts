import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { User, AuthPayload } from "../types";

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },

    loginSuccess(state, action: PayloadAction<AuthPayload>) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
      state.isLoading = false;
    },

    restoreSession(state, action: PayloadAction<AuthPayload>) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
      state.isLoading = false;
    },

    clearSession(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },

    updateUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
  },
});

export const {
  setLoading,
  loginSuccess,
  restoreSession,
  updateUser,
  clearSession,
} = authSlice.actions;

export default authSlice.reducer;
