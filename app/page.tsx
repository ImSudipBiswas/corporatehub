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
          <Images />
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

function Images() {
  return (
    <>
      <div className="max-md:hidden h-24 w-24 rounded-full bg-[url(https://images.pexels.com/photos/18281423/pexels-photo-18281423/free-photo-of-portrait-of-an-african-man-wearing-black-shirt.jpeg?auto=compress&cs=tinysrgb&w=600)] bg-center bg-cover bg-white absolute left-20 lg:left-24 top-12" />
      <div className="bg-[url(https://images.pexels.com/photos/18265824/pexels-photo-18265824/free-photo-of-portrait-of-an-african-man-wearing-a-cap.jpeg?auto=compress&cs=tinysrgb&w=600)] bg-center bg-cover max-md:hidden h-24 w-24 rounded-full bg-white absolute right-20 lg:right-24 top-12" />

      <div className="bg-[url(https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600)] bg-center bg-cover h-16 w-16 md:h-20 md:w-20 rounded-full bg-white absolute left-16 sm:left-20 md:left-48 lg:left-60 top-4 md:top-20" />
      <div className="bg-[url(https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600)] bg-cover bg-center h-16 w-16 md:h-20 md:w-20 rounded-full bg-white absolute right-16 sm:right-20 md:right-48 lg:right-60 top-4 md:top-20" />

      <div className="bg-[url(https://images.pexels.com/photos/789822/pexels-photo-789822.jpeg?auto=compress&cs=tinysrgb&w=600)] bg-center bg-cover h-24 w-24 rounded-full bg-white absolute left-[22rem] top-6 max-xl:hidden" />
      <div className="bg-[url(https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)] bg-cover bg-center h-24 w-24 rounded-full bg-white absolute right-[22rem] top-6 max-xl:hidden" />

      <div className="bg-[url(https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=600)] bg-cover bg-center h-20 w-20 md:h-28 md:w-28 rounded-full bg-white absolute left-1/2 right-1/2 top-6 md:top-20 -translate-x-1/2" />
    </>
  );
}
