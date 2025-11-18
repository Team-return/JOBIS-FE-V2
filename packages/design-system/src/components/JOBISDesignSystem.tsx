import { useTheme } from "@/hooks";
import { ThemeProvider } from "@emotion/react";
import { ModalManager, ToastManager } from "@/components";
import type { ReactNode } from "react";

export const JOBISDesignSystem = ({ children }: { children: ReactNode }) => {
  const { currentTheme } = useTheme();

  const modalContainer = document.createElement("div");
  modalContainer.id = "modal-root";
  document.body.appendChild(modalContainer);

  const toastContainer = document.createElement("div");
  toastContainer.id = "toast-root";
  document.body.appendChild(toastContainer);

  return (
    <ThemeProvider theme={currentTheme}>
      <ModalManager />
      <ToastManager />
      {children}
    </ThemeProvider>
  );
};
