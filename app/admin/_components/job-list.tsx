"use client";

import { useJobs } from "@/hooks/use-jobs";

export const JobList = () => {
  const { data, isPending, isError, error, isFetching, isPlaceholderData } = useJobs(1);

  return (
    <section className="w-full py-6 mt-4">
      <div className="flex items-center justify-between"></div>
    </section>
  );
};
