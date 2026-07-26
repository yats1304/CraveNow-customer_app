import { resetInterceptorSessionState } from "@/services/api/interceptor";
import { AppDispatch } from "@/store/store";
import { loginSuccess } from "../auth/redux/authSlice";
import { AuthResponse } from "../auth/types";

export const syncSession = (dispatch: AppDispatch, data: AuthResponse) => {
  resetInterceptorSessionState();
  dispatch(
    loginSuccess({
      user: data.user,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    }),
  );
};
