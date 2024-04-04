"use client";

import { Plus } from "lucide-react";

import { useModal } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";

export const CreateJobModalTrigger = () => {
  const { onOpen } = useModal();

  return (
    <Button onClick={() => onOpen("add-job")} className="flex items-center">
      <Plus className="h-4 w-4 sm:mr-2" />
      <span className="font-medium max-sm:hidden text-sm">Create New</span>
    </Button>
  );
};
