import { ToastType } from "./toastType.type";

export type ToastState = {
  visible : boolean;
  message : string;
  type    : ToastType;
};