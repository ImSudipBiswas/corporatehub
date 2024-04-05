"use client";

import { ChevronRight, Loader2 } from "lucide-react";

import { useFeed } from "@/hooks/use-feed";
import { JobCardSkeleton } from "@/components/skeletons/job-card-skeleton";
import { JobCard } from "./job-card";

export const Feed = () => {
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useFeed();

  const jobs = data?.pages.flat(1);

  return (
    <section className="mt-4 w-full py-2 mb-10">
      <h5 className="text-medium">Recommended for you</h5>
      <div className="z-20 w-full mt-6 flex items-center gap-6 py-2 overflow-x-scroll scrollbar_hidden">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => <JobCardSkeleton key={i} />)
          : jobs?.map((data, i) => <JobCard key={i} data={data} />)}
        {(hasNextPage || isFetchingNextPage) && (
          <button
            onClick={() => fetchNextPage()}
            className="bg-primary text-white p-2 rounded-full"
          >
            {isFetchingNextPage ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <ChevronRight size={18} />
            )}
          </button>
        )}
      </div>
    </section>
  );
};
