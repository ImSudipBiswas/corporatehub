"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

interface PaginationProps {
  page: number;
  isNext: boolean;
}

export const Pagination = ({ page, isNext }: PaginationProps) => {
  const router = useRouter();

  let currentPage: number;
  if (typeof page === "number") {
    currentPage = page;
  } else {
    currentPage = parseInt(page);
  }

  const isFirstPage = currentPage === 1;

  const nextPage = () => {
    if (isNext) {
      router.push(`/admin?page=${currentPage + 1}`);
    }
  };

  const previousPage = () => {
    if (!isFirstPage) {
      router.push(`/admin?page=${currentPage - 1}`);
    }
  };

  return (
    <div className="flex items-center justify-end gap-2.5 mt-4">
      <Button disabled={isFirstPage} onClick={previousPage}>
        Previous
      </Button>
      <Button disabled={!isNext} onClick={nextPage}>
        Next
      </Button>
    </div>
  );
};
