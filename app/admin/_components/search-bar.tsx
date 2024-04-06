"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";

export const SearchBar = () => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 400);

  useEffect(() => {
    if (debouncedValue === "") {
      return router.push("/admin");
    }
    router.push(`/admin?search=${debouncedValue}`);
  }, [debouncedValue, router]);

  return <Input placeholder="Search..." value={value} onChange={(e) => setValue(e.target.value)} />;
};
