"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { MapPin, Search } from "lucide-react";

import { JobWithOrganization } from "@/types";
import { useDebounce } from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";
import { useModal } from "@/hooks/use-modal-store";

interface SearchBarProps {
  className?: string;
}

export const SearchBar = ({ className }: SearchBarProps) => {
  const [search, setSearch] = useState("");
  const [jobs, setJobs] = useState<JobWithOrganization[]>([]);
  const debouncedSearch = useDebounce(search, 500);
  const { onOpen } = useModal();

  const onClick = (job: JobWithOrganization) => {
    setSearch("");
    onOpen("job", job);
  };

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await axios.get(`/api/jobs?search=${debouncedSearch}`);
      setJobs(res.data.jobs);
    };
    if (debouncedSearch.length > 0) {
      fetchJobs();
    }
  }, [debouncedSearch]);

  return (
    <div
      className={cn(
        "max-sm:h-12 h-16 p-2 flex items-center gap-1 rounded-full bg-background w-full shadow-md",
        "absolute max-sm:-bottom-4 -bottom-6 inset-x-0 max-w-[90%] lg:max-w-[80%] mx-auto",
        className
      )}
    >
      <button className="h-full cursor-default max-sm:w-8 w-12 rounded-full bg-accent flex items-center justify-center">
        <Search className="h-4 w-4 text-background" />
      </button>
      <input
        type="text"
        className="flex-1 h-full max-sm:text-sm px-2 border-none outline-none bg-transparent placeholder-muted-foreground text-muted-foreground font-semibold"
        placeholder="Job title, keyword or company"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="cursor-default h-full flex items-center gap-2 rounded-full max-sm:px-2 px-7 py-3 bg-muted text-muted-foreground">
        <MapPin className="h-5 w-5" />
        <span className="max-sm:hidden font-semibold">Any location</span>
      </button>
      {debouncedSearch.length > 0 && jobs.length > 0 && (
        <div className="absolute top-14 sm:top-[4.5rem] inset-x-0 rounded-md overflow-hidden border bg-background">
          {jobs.map((job) => (
            <div key={job.id} onClick={() => onClick(job)} className="cursor-pointer p-3 border-b">
              <div className="flex items-center gap-2.5">
                <div className="rounded-full h-9 w-9 bg-muted"></div>
                <div>
                  <p className="font-semibold">{job.title}</p>
                  <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    {job.location} <span className="h-1 w-1 bg-muted-foreground rounded-full" />
                    {job.organization.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
