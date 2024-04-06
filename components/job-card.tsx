"use client";

import Image from "next/image";
import { useMemo } from "react";

import type { JobWithOrganization } from "@/types";
import { formatSalary } from "@/lib/utils";
import { useModal } from "@/hooks/use-modal-store";

export const JobCard = ({ data }: { data: JobWithOrganization }) => {
  const { onOpen } = useModal();

  const location = useMemo(
    () =>
      data.location?.toLowerCase() === "remote" ? ["Remote", "🌍"] : data.location?.split(", "),
    [data.location]
  );

  const formattedSalary = formatSalary(data.minSalary, data.maxSalary);

  return (
    <div
      onClick={() => onOpen("job", data)}
      className="cursor-pointer min-w-72 rounded-xl border p-5 lg:p-6"
    >
      <div className="h-14 w-14 bg-muted rounded-full p-2">
        <div className="h-full w-full rounded-full bg-muted relative overflow-hidden">
          <Image
            src={data.organization.image}
            alt="Organization logo"
            fill
            className="object-cover"
          />
        </div>
      </div>
      <h5 className="font-bold mt-4">{data.title}</h5>
      <p className="text-muted-foreground text-sm font-medium flex items-center gap-1 mt-1">
        {location[0]}
        <span className="h-1 w-1 bg-muted-foreground rounded-full" />
        {location[1]}
      </p>
      <div className="rounded-full border py-2.5 px-4 text-sm font-bold mt-6 w-fit">
        {formattedSalary} per month
      </div>
    </div>
  );
};
