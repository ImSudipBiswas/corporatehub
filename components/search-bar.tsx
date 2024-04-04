import { MapPin, Search } from "lucide-react";

import { cn } from "@/lib/utils";

interface SearchBarProps {
  className?: string;
}

export const SearchBar = ({ className }: SearchBarProps) => {
  return (
    <div
      className={cn(
        "max-sm:h-12 h-16 p-2 flex items-center gap-1 rounded-full bg-background w-full shadow-md",
        className
      )}
    >
      <button className="h-full max-sm:w-8 w-12 rounded-full bg-accent flex items-center justify-center">
        <Search className="h-4 w-4 text-background" />
      </button>
      <input
        type="text"
        className="flex-1 h-full max-sm:text-sm px-2 border-none outline-none bg-transparent placeholder-muted-foreground text-muted-foreground font-semibold"
        placeholder="Job title, keyword or company"
      />
      <button className="h-full flex items-center gap-2 rounded-full max-sm:px-2 px-7 py-3 bg-muted text-muted-foreground">
        <MapPin className="h-5 w-5" />
        <span className="max-sm:hidden font-semibold">Any location</span>
      </button>
    </div>
  );
};
