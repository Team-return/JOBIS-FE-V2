import { cloneElement, useEffect, useState } from "react";
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

export const ToastManager = (): ReturnType<typeof createPortal> | null => {
  const { toasts } = useToastStore();
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof document === "undefined") return;
    let el = document.getElementById("toast-root");
    if (!el) {
      el = document.createElement("div");
      el.id = "toast-root";
      document.body.appendChild(el);
    }
    setContainer(el);
  }, []);

  if (!container) return null;

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
  );
};
