import { Skeleton } from "@/components/ui/skeleton";

export const JobCardSkeleton = () => {
  return (
    <div className="rounded-xl border min-w-72 h-[235px] p-5 lg:p-6">
      <Skeleton className="h-14 w-14 rounded-full" />
      <Skeleton className="mt-4 w-4/5 h-7" />
      <Skeleton className="mt-1 w-3/5 h-5" />
      <Skeleton className="rounded-full mt-6 w-4/5 h-8" />
    </div>
  );
};
