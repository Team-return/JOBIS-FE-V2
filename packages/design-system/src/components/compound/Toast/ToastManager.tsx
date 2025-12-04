import { ReactNode, cloneElement } from "react";
import { createPortal } from "react-dom";
import { useToastStore } from "@/hooks/useToast";
import styled from "@emotion/styled";

const ToastContainer = styled.div`
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 12px;
  pointer-events: none;

  > * {
    pointer-events: auto;
  }
`;

export const ToastManager = (): ReactNode => {
  const { toasts } = useToastStore();
  const container = document.getElementById("toast-root")!;

  return createPortal(
    <ToastContainer
      role="region"
      aria-live="polite"
      aria-relevant="additions text"
      aria-label="알림 토스트"
    >
      {toasts.map(({ component, id }) =>
        cloneElement(component, {
          key: id
        })
      )}
    </ToastContainer>,
    container
  ) as ReactNode;
};
