import type { ToastType } from "@shared/types/toastType.type";
import type { ToastState } from "@shared/types/toastState.type";

type Setter = React.Dispatch<React.SetStateAction<ToastState>>;

export const showToast = (
  setter  : Setter,
  message : string,
  type    : ToastType
): void => {

  setter({
    visible: true,
    message,
    type,
  });

  setTimeout(() => {
    setter(prev => ({
      ...prev,
      visible: false,
    }));
  }, 3000);
};