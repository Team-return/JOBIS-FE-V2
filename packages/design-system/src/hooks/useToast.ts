import { create } from "zustand";
import type { ReactElement } from "react";

let toastId = 0;

export type ToastType = {
  id: string;
  component: ReactElement;
};

type ToastState = {
  toasts: ToastType[];
  openToast: (toast: ToastType) => void;
  closeToast: (id: string) => void;
};

export const useToastStore = create<ToastState>(set => ({
  toasts: [],
  openToast: toast => set(state => ({ toasts: [...state.toasts, toast] })),
  closeToast: id =>
    set(state => ({ toasts: state.toasts.filter(toast => toast.id !== id) }))
}));

export const useToast = () => {
  const { openToast, closeToast } = useToastStore();

  return {
    open: (component: ReactElement, duration = 3000) => {
      toastId += 1;
      const id = `toast-${toastId}`;
      openToast({ id, component });

      if (duration > 0) {
        setTimeout(() => {
          closeToast(id);
        }, duration);
      }

      return id;
    },
    close: closeToast
  };
};
