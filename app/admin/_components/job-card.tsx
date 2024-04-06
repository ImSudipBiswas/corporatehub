"use client";

import { format } from "date-fns";
import { Edit, ExternalLink, Trash } from "lucide-react";

import { JobWithOrganization } from "@/types";
import { formatSalary } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";

export const JobCard = ({ job }: { job: JobWithOrganization }) => {
  const { onOpen } = useModal();

  return (
    <div className="flex items-center justify-between p-4 border rounded-md">
      <div>
        <h2 className="text-lg font-semibold flex items-center">
          {job.title}
          <ExternalLink
            onClick={() => onOpen("job", job)}
            className="text-blue-500 h-4 w-4 ml-2 cursor-pointer"
          />
        </h2>
        <p className="text-sm text-muted-foreground font-medium">{job.description}</p>
      </div>
      <p className="text-sm font-medium text-muted-foreground">{job.location}</p>
      <p className="text-sm font-medium text-muted-foreground">
        {formatSalary(job.minSalary, job.maxSalary)}
      </p>
      <p className="text-sm font-medium text-muted-foreground">{format(job.deadline, "PPP")}</p>
      <div className="flex items-center gap-2">
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
