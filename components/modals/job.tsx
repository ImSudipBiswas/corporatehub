"use client";

import Image from "next/image";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";
import { toast } from "react-hot-toast";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { formatSalary } from "@/lib/utils";

export const JobModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(async () => {
      const promise = new Promise((res) => setTimeout(res, 1000));
      await Promise.all([promise]).then(() => {
        toast.success("Applied successfully!");
        onClose();
      });
    });
  };

  if (!data) return null;

  const isExpired = new Date(data.deadline!) < new Date();
  const salary = formatSalary(data.minSalary, data.maxSalary);
  const isModalOpen = isOpen && type === "job";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="flex flex-row items-center gap-2.5">
          <div className="h-14 w-14 bg-muted rounded-full p-2">
            {data.organization?.image && (
              <div className="h-full w-full rounded-full relative overflow-hidden">
                <Image
                  src={data.organization.image}
                  alt="Organization logo"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
          <div className="space-y-1.5 flex-1">
            <DialogTitle className="w-fit">{data?.title}</DialogTitle>
            <DialogDescription className="flex items-center gap-1.5">
              {data.location} <span className="h-1 w-1 bg-muted-foreground rounded-full" />
              {data.organization.name}
            </DialogDescription>
          </div>
        </DialogHeader>
        <div className="space-y-4">
          <p className="font-semibold text-lg">Job description</p>
          <pre className="whitespace-pre-wrap font-sans text-sm">{data?.description}</pre>
          <div className="flex items-center justify-between">
            <p className="font-medium text-sm">Salary - {salary} per month</p>
            {isExpired || !data?.deadline ? (
              <p className="text-xs text-red-500 bg-red-500/15 rounded-full py-1 px-2">
                Application are closed
              </p>
            ) : (
              <p className="text-xs">Apply by {format(data.deadline, "PPP")}</p>
            )}
          </div>
        </div>
        <DialogFooter className="mt-2">
          <Button
            onClick={onClick}
            disabled={isPending || isExpired}
            className="w-full flex items-center"
          >
            {isPending && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
            Apply
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
