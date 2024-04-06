"use client";

import axios, { AxiosError } from "axios";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";

export const DeleteJobModal = () => {
  const router = useRouter();
  const { isOpen, onClose, type, data } = useModal();
  const [isPending, startTransition] = useTransition();

  const handleDeleteJob = () => {
    startTransition(() => {
      try {
        axios.delete(`/api/jobs/${data?.id}`).then(() => {
          router.refresh();
          onClose();
        });
      } catch (error: AxiosError | any) {
        console.log(error);
        toast.error(error?.response?.data || error.message);
      }
    });
  };

  const isModalOpen = isOpen && type === "delete-job";

  if (!data) return null;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete job &#34;{data.title}&#34;</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this job? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <Button onClick={handleDeleteJob} disabled={isPending} className="w-full flex items-center">
          {isPending && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
          {isPending ? "Deleting..." : "Delete"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
