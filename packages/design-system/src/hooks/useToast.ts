import { create } from "zustand";
import { createElement, type ReactElement } from "react";
import { Toast } from "@/components/compound/Toast";

export type ToastItem = {
  id: string;
  component: ReactElement;
  isClosing?: boolean;
};

type ToastState = {
  toasts: ToastItem[];
  openToast: (toast: ToastItem) => void;
  closeToast: (id: string) => void;
  updateToast: (id: string, updates: Partial<ToastItem>) => void;
};

export const useToastStore = create<ToastState>(set => ({
  toasts: [],
  openToast: toast => set(state => ({ toasts: [...state.toasts, toast] })),
  closeToast: id =>
    set(state => ({ toasts: state.toasts.filter(toast => toast.id !== id) })),
  updateToast: (id, updates) =>
    set(state => ({
      toasts: state.toasts.map(toast =>
        toast.id === id ? { ...toast, ...updates } : toast
      )
    }))
}));

export const useToast = () => {
  const { openToast, closeToast, updateToast } = useToastStore();
  const toastTimers = new Map<string, ReturnType<typeof setTimeout>>();

  const showToast = (
    message: string,
    type: "success" | "error" | "warning" | "info"
  ) => {
    const id = `toast-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
    const component = createElement(Toast, { $label: message, $type: type });
    openToast({ id, component, isClosing: false });

    const timerId = setTimeout(() => {
      close(id);
    }, 3000);
    toastTimers.set(id, timerId);

    return id;
  };

  const close = (id: string) => {
    // Start closing animation
    const component = useToastStore
      .getState()
      .toasts.find(t => t.id === id)?.component;
    if (component) {
      const closingComponent = createElement(Toast, {
        ...component.props,
        $isClosing: true
      });
      updateToast(id, { component: closingComponent, isClosing: true });
    }

    // Remove after animation completes
    setTimeout(() => {
      const timerId = toastTimers.get(id);
      if (timerId) {
        clearTimeout(timerId);
        toastTimers.delete(id);
      }
      closeToast(id);
    }, 300); // Match animation duration
  };

  return {
    success: (message: string) => showToast(message, "success"),
    error: (message: string) => showToast(message, "error"),
    warning: (message: string) => showToast(message, "warning"),
    info: (message: string) => showToast(message, "info"),
    close
  };
};
