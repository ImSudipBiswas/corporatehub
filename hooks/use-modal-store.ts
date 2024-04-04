import { create } from "zustand";

type Modal = "sign-in" | "sign-up" | "sign-out" | "add-job" | "update-job" | "delete-job";

interface ModalState {
  isOpen: boolean;
  type: Modal | null;
  onOpen: (type: Modal) => void;
  onClose: () => void;
}

export const useModal = create<ModalState>((set) => ({
  isOpen: false,
  type: null,
  onOpen: (type) => set({ isOpen: true, type }),
  onClose: () => set({ isOpen: false, type: null }),
}));
