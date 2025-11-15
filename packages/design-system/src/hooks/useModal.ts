import { create } from "zustand";
import type { ReactElement } from "react";

let modalId = 0;

export type ModalType = {
  id: string;
  component: ReactElement;
};

type ModalState = {
  modals: ModalType[];
  openModal: (modal: ModalType) => void;
  closeModal: () => void;
};

export const useModalStore = create<ModalState>(set => ({
  modals: [],
  openModal: modal => set(state => ({ modals: [...state.modals, modal] })),
  closeModal: () => set(state => ({ modals: state.modals.slice(0, -1) }))
}));

export const useModal = () => {
  const { openModal, closeModal } = useModalStore();

  return {
    open: (component: ReactElement) => {
      modalId += 1;
      openModal({ id: `modal-${modalId}`, component });
    },
    close: closeModal
  };
};
