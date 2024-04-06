import { Suspense } from "react";
import { redirect } from "next/navigation";

import { currentOrg } from "@/lib/org";
import { JobList } from "./_components/job-list";
import { CreateJobModalTrigger } from "./_components/create-job-modal-trigger";
import { SearchBar } from "./_components/search-bar";
import { Skeleton } from "@/components/ui/skeleton";

interface AdminPageProps {
  searchParams: {
    page: number;
    search: string;
  };
}

export default async function AdminPage({
  searchParams: { page = 1, search = "" },
}: AdminPageProps) {
  const org = await currentOrg();
  if (!org) {
    return redirect("/");
  }

  return (
    <>
      <section className="w-full py-8 border-b">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold">Dashboard</h1>
            <p className="md:text-lg text-muted-foreground font-medium">
              Welcome back, <span className="text-primary">{org?.name}</span>
            </p>
          </div>
          <CreateJobModalTrigger />
        </div>
      </section>
      <section className="py-6 w-full">
        <SearchBar />
        <Suspense fallback={<JobListSkeleton />}>
          <JobList orgId={org.id} page={page} search={search} />
        </Suspense>
      </section>
    </>
  );
}

const JobListSkeleton = () => {
  return (
    <div className="flex flex-col gap-3 mt-4">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-9 xl:grid-cols-8 p-3 md:p-4 border rounded-md"
        >
          <div className="space-y-1 col-span-3">
            <Skeleton className="h-7 w-44 lg:w-60" />
            <Skeleton className="h-3 w-20" />
          </div>
          <div className="max-sm:hidden h-full flex items-center col-span-2">
            <Skeleton className="h-5 w-28 lg:w-44" />
          </div>
          <div className="max-md:hidden h-full flex items-center col-span-2">
            <Skeleton className="h-5 w-28 lg:w-44" />
          </div>
          <div className="flex justify-end items-center gap-2 col-span-2 xl:col-span-1">
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-10 w-10" />
          </div>
        </div>
      ))}
    </div>
  );
};
