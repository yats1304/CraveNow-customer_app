import { AppDispatch } from "@/store/store";
import { loginSuccess } from "../auth/redux/authSlice";
import { AuthResponse } from "../auth/types";

export const syncSession = (dispatch: AppDispatch, data: AuthResponse) => {
  dispatch(
    loginSuccess({
      user: data.data.user,
      accessToken: data.data.tokens.accessToken,
      refreshToken: data.data.tokens.refreshToken,
    }),
  );
};
