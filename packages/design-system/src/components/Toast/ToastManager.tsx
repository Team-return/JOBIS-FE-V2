import { cloneElement } from "react";
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

export const ToastManager = (): ReturnType<typeof createPortal> => {
  const { toasts } = useToastStore();

  const toastRoot =
    document.getElementById("toast-root") ||
    (() => {
      const root = document.createElement("div");
      root.id = "toast-root";
      document.body.appendChild(root);
      return root;
    })();

  return createPortal(
    <ToastContainer>
      {toasts.map(({ component, id }) =>
        cloneElement(component, {
          key: id
        })
      )}
    </ToastContainer>,
    toastRoot
  );
};
