import { create } from "zustand";

import { Job } from "@/types";

type Modal = "sign-in" | "sign-up" | "sign-out" | "add-job" | "update-job" | "delete-job" | "job";

interface Data extends Job {
  formattedSalary?: string;
  orgImage: string | null;
}

interface ModalState {
  isOpen: boolean;
  type: Modal | null;
  data?: Data;
  onOpen: (type: Modal, data?: Data) => void;
  onClose: () => void;
}

export const useModal = create<ModalState>((set) => ({
  isOpen: false,
  type: null,
  onOpen: (type, data) => set({ isOpen: true, type, data }),
  onClose: () => set({ isOpen: false, type: null }),
}));
