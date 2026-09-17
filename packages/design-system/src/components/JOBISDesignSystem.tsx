import { useTheme } from "@/hooks";
import { ThemeProvider } from "@emotion/react";
import { ModalManager, ToastManager } from "@/components";
import type { ReactNode } from "react";
import { GlobalStyles } from "@/themes";

export const JOBISDesignSystem = ({ children }: { children: ReactNode }) => {
  const { currentTheme: theme } = useTheme();

  if (!document.querySelector("#modal-root")) {
    const modalContainer = document.createElement("div");
    modalContainer.id = "modal-root";
    document.body.appendChild(modalContainer);
  }

  if (!document.querySelector("#toast-root")) {
    const toastContainer = document.createElement("div");
    toastContainer.id = "toast-root";
    document.body.appendChild(toastContainer);
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ModalManager />
      <ToastManager />
      {children}
    </ThemeProvider>
  );
};
