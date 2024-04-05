import Image from "next/image";
import { useMemo } from "react";

import { Job } from "@/types";
import { useModal } from "@/hooks/use-modal-store";

export const JobCard = ({ data }: { data: Job }) => {
  const { onOpen } = useModal();

  const location = useMemo(
    () =>
      data.location?.toLowerCase() === "remote" ? ["Remote", "🌍"] : data.location?.split(", "),
    [data.location]
  );

  const orgImage = useMemo(() => {
    if (typeof data.organization === "string") {
      return null;
    } else {
      return data.organization?.image;
    }
  }, [data.organization]);

  const formattedSalary = useMemo(() => {
    if (data.minSalary && data.maxSalary) {
      return `$${data.minSalary / 1000}k - $${data.maxSalary / 1000}k`;
    } else if (data.minSalary && !data.maxSalary) {
      return `$${data.minSalary / 1000}k`;
    }
  }, [data.minSalary, data.maxSalary]);

  const formattedData = useMemo(() => {
    return {
      ...data,
      orgImage,
      formattedSalary,
    };
  }, [data, orgImage, formattedSalary]);

  return (
    <div
      onClick={() => onOpen("job", formattedData)}
      className="cursor-pointer min-w-72 rounded-xl shadow border p-5 lg:p-6 hover:shadow-none transition"
    >
      <div className="h-14 w-14 bg-muted rounded-full p-2">
        {orgImage && (
          <div className="h-full w-full rounded-full relative overflow-hidden">
            <Image src={orgImage} alt="" fill className="object-cover" />
          </div>
        )}
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
