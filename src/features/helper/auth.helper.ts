import { resetInterceptorSessionState } from "@/services/api/interceptor";
import { AppDispatch } from "@/store/store";
import { logger } from "@/utils";
import { loginSuccess } from "../auth/redux/authSlice";
import { AuthResponse } from "../auth/types";

export const syncSession = (dispatch: AppDispatch, data: AuthResponse) => {
  logger.info("AuthHelper", "Syncing authenticated session to Redux store", {
    userId: data.user?._id,
    email: data.user?.email,
  });
  resetInterceptorSessionState();
  dispatch(
    loginSuccess({
      user: data.user,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    }),
  );
};
