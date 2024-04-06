import { create } from "zustand";

import { JobWithOrganization } from "@/types";

type Modal = "sign-in" | "sign-up" | "sign-out" | "add-job" | "update-job" | "delete-job" | "job";

interface ModalState {
  isOpen: boolean;
  type: Modal | null;
  data?: JobWithOrganization;
  onOpen: (type: Modal, data?: JobWithOrganization) => void;
  onClose: () => void;
}

export const useModal = create<ModalState>((set) => ({
  isOpen: false,
  type: null,
  onOpen: (type, data) => set({ isOpen: true, type, data }),
  onClose: () => set({ isOpen: false, type: null }),
}));
