import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchJobs } from "@/actions/job";

export function useJobs(page: number) {
  return useQuery({
    queryKey: ["jobs", { page }],
    queryFn: () => fetchJobs(page),
    placeholderData: keepPreviousData,
  });
}
