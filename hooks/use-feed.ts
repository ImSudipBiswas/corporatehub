import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchFeed } from "@/actions/job";
import { Job } from "@/types";

const fetcher = async ({ pageParam = 1 }) => {
  const res = await fetchFeed({ pageParam });
  return JSON.parse(res) as Job[];
};

export function useFeed() {
  return useInfiniteQuery({
    queryKey: ["feed"],
    queryFn: fetcher,
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    getPreviousPageParam: (_, __, firstPageParam) => {
      if (firstPageParam <= 1) {
        return undefined;
      }
      return firstPageParam - 1;
    },
  });
}
