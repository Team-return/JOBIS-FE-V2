import { ReactNode, cloneElement } from "react";
import { createPortal } from "react-dom";
import { useModalStore } from "@/hooks/useModal";

export const ModalManager = (): ReactNode => {
  const { modals, closeModal } = useModalStore();
  const container = document.getElementById("modal-root")!;

  return createPortal(
    <>
      {modals.map(({ component, id }) =>
        cloneElement(component, {
          key: id,
          onClose: closeModal
        })
      )}
    </>,
    container
  ) as ReactNode;
};
