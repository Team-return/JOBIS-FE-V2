import { cloneElement } from "react";
import { createPortal } from "react-dom";
import { useModalStore } from "../../hooks/useModal";

export const ModalManager = (): ReturnType<typeof createPortal> => {
  const { modals, closeModal } = useModalStore();

  const modalRoot =
    document.getElementById("modal-root") ||
    (() => {
      const root = document.createElement("div");
      root.id = "modal-root";
      document.body.appendChild(root);
      return root;
    })();

  return createPortal(
    <>
      {modals.map(({ component, id }) =>
        cloneElement(component, {
          key: id,
          onClose: closeModal
        })
      )}
    </>,
    modalRoot
  );
};
