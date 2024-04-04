"use client";

import { useTransition } from "react";
import { Loader2 } from "lucide-react";

import { signOut } from "@/actions/auth";
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
          <Button
            formAction={handleSignOut}
            disabled={isPending}
            type="submit"
            className="w-full flex items-center"
          >
            {isPending && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
            {isPending ? "Signing out..." : "Sign out"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
