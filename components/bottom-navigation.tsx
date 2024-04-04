"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { navLinks } from "@/lib/constants";

export const BottomNavigation = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 inset-x-0 h-16 border-t z-10 px-4 py-2 sm:hidden bg-background">
      <div className="w-full h-full flex items-center justify-evenly">
        {navLinks.map(({ href, label, icon }, index) => {
          const isActive = href === "/" && href === pathname;
          const Icon = icon;
          return (
            <Link
              key={index}
              href={href}
              className={cn(
                "flex flex-col items-center gap-1 p-2 font-medium text-muted-foreground text-sm",
                isActive && "text-foreground"
              )}
            >
              <Icon size={18} />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
