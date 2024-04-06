"use client";

import { useTransition } from "react";
import { Loader2 } from "lucide-react";

import { logout } from "@/actions/auth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";

export const SignOutModal = () => {
  const { isOpen, onClose, type } = useModal();
  const [isPending, startTransition] = useTransition();

  const handleSignOut = () => {
    startTransition(() => {
      logout();
      onClose();
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
        <Button onClick={handleSignOut} disabled={isPending} className="w-full flex items-center">
          {isPending && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
          {isPending ? "Signing out..." : "Sign out"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
