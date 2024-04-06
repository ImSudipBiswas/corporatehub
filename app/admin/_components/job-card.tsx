"use client";

import { format } from "date-fns";
import { Edit, Trash } from "lucide-react";

import { JobWithOrganization } from "@/types";
import { formatSalary } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";

export const JobCard = ({ job }: { job: JobWithOrganization }) => {
  const { onOpen } = useModal();

  return (
    <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-9 xl:grid-cols-8 p-3 md:p-4 border rounded-md">
      <div className="space-y-1 col-span-3">
        <p className="font-semibold cursor-pointer inline" onClick={() => onOpen("job", job)}>
          {job.title}
        </p>
        <p className="text-xs font-medium text-muted-foreground">{job.location}</p>
      </div>
      <p className="hidden text-sm font-medium text-muted-foreground sm:flex items-center h-full col-span-2">
        <span className="max-lg:hidden mr-1">Apply by</span>
        {format(job.deadline, "PPP")}
      </p>
      <p className="hidden text-sm font-medium md:flex items-center h-full text-muted-foreground col-span-2">
        {formatSalary(job.minSalary, job.maxSalary)} / month
      </p>
      <div className="flex justify-end items-center gap-2 col-span-2 xl:col-span-1">
        <Button onClick={() => onOpen("update-job", job)} variant="secondary" size="icon">
          <Edit className="h-3.5 w-3.5" />
        </Button>
        <Button onClick={() => onOpen("delete-job", job)} variant="destructive" size="icon">
          <Trash className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
};
