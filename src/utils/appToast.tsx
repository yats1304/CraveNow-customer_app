import { ToastRef } from "@/components/ui/Toast";

let activeToastRef: ToastRef | null = null;

export const registerToastRef = (ref: ToastRef | null) => {
  activeToastRef = ref;
};

export const showToast = {
  success(message: string) {
    activeToastRef?.success(message);
  },

  error(message: string) {
    activeToastRef?.error(message);
  },
};
