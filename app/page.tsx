import Link from "next/link";
import { Suspense } from "react";
import { Search } from "lucide-react";

import { suggestedJobsSearches } from "@/lib/constants";
import { Skeleton } from "@/components/ui/skeleton";
import { Feed } from "@/components/feed";
import { SearchBar } from "@/components/search-bar";
import { JobCardSkeleton } from "@/components/skeletons/job-card-skeleton";

export default function Home() {
  return (
    <>
      <section className="py-10 w-full">
        <div className="relative h-[250px] sm:h-[300px] md:h-[400px] rounded-3xl [background:linear-gradient(135deg,var(--secondary)_25%,var(--primary)_85%)]">
          <div className="absolute bottom-12 sm:bottom-20 inset-x-0 space-y-3">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center text-background font-bold">
              Search for your next job
            </h1>
            <p className="w-[90%] max-w-lg mx-auto max-sm:text-sm text-center text-muted font-medium">
              When you&apos;re searching for a job, there are few things you can do to get the most
              of your search
            </p>
          </div>
          <SearchBar />
        </div>
        <p className="mt-9 sm:mt-12 text-muted-foreground text-center text-sm">
          You can also{" "}
          <Link href="/admin" className="text-foreground font-bold">
            Post a job
          </Link>{" "}
          or{" "}
          <Link href="#" className="text-foreground font-bold">
            Post your resume
          </Link>
        </p>
      </section>
      <section className="mt-1 w-full py-6">
        <h5 className="text-medium">Suggested job searches</h5>
        <div className="mt-6 flex items-center justify-center flex-wrap gap-2">
          {suggestedJobsSearches.map((job, i) => (
            <button key={i} className="flex items-center py-2 px-4 rounded-full border font-bold">
              <span className="text-xs">{job}</span>
              <Search className="h-3.5 w-3.5 ml-2" />
            </button>
          ))}
        </div>
      </section>
      <Suspense fallback={<FeedSuspense />}>
        <Feed />
      </Suspense>
    </>
  );
}

function FeedSuspense() {
  return (
    <div className="mt-4 w-full py-2 mb-10">
      <Skeleton className="h-6 w-24" />
      <div className="z-20 w-full mt-6 flex items-center gap-6 py-2 overflow-x-scroll scrollbar_hidden">
        {Array.from({ length: 3 }).map((_, i) => (
          <JobCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
