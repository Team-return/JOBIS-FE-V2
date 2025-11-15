import { create } from "zustand";
import type { ReactElement } from "react";

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
  const toastTimers = new Map<string, ReturnType<typeof setTimeout>>();

  const open = (component: ReactElement, duration = 3000) => {
    if (typeof duration !== "number" || duration < 0) {
      throw new Error("Duration must be a non-negative number");
    }

    const id = `toast-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
    openToast({ id, component });

    if (duration > 0) {
      const timerId = setTimeout(() => {
        close(id);
      }, duration);
      toastTimers.set(id, timerId);
    }

    return id;
  };

  const close = (id: string) => {
    // Clear timer if exists
    const timerId = toastTimers.get(id);
    if (timerId) {
      clearTimeout(timerId);
      toastTimers.delete(id);
    }
    closeToast(id);
  };

  return {
    open,
    close
  };
};
