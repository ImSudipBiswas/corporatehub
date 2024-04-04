"use client";

import { useTransition } from "react";

import { signOut } from "@/actions/sign-out";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";

export const SignOutModal = () => {
  const { isOpen, onClose, type } = useModal();
  const [isPending, startTransition] = useTransition();

  const handleSignOut = () => {
    startTransition(() => {
      signOut();
      window.location.reload();
    });
  };

  const isModalOpen = isOpen && type === "sign-out";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign out</DialogTitle>
          <DialogDescription>Are you sure you want to sign out?</DialogDescription>
        </DialogHeader>
        <form className="space-y-4">
          <button
            formAction={handleSignOut}
            disabled={isPending}
            type="submit"
            className="w-full rounded-full bg-primary text-background font-medium py-2 px-4 disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-70"
          >
            Sign out
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
