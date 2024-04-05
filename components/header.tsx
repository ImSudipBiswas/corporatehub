"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback } from "react";
import { usePathname } from "next/navigation";
import { Bell, User } from "lucide-react";

import { cn } from "@/lib/utils";
import { navLinks } from "@/lib/constants";
import { useAuth } from "@/hooks/use-auth";
import { useModal } from "@/hooks/use-modal-store";

export const Header = () => {
  const pathname = usePathname();
  const { onOpen } = useModal();
  const { organization, isLoading } = useAuth();

  const onClick = useCallback(() => {
    if (organization) {
      onOpen("sign-out");
    } else {
      onOpen("sign-in");
    }
    return;
  }, [onOpen, organization]);

  return (
    <header className="sticky top-0 inset-x-0 h-16 border-b bg-background z-10">
      <nav className="w-full h-full px-6 lg:px-0 md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex h-full items-center gap-3">
          <Link
            href="/"
            className="h-9 w-9 rounded-full bg-gradient-to-br from-secondary to-primary mr-2"
          />
          {navLinks.map(({ href, label }, index) => {
            const isActive = href === "/" && href === pathname;

            return (
              <Link
                key={index}
                href={href}
                className={cn(
                  "hidden sm:inline p-2 font-medium text-muted-foreground text-sm",
                  isActive && "text-foreground"
                )}
              >
                {label}
              </Link>
            );
          })}
        </div>
        <div className="h-full flex items-center gap-3 sm:gap-5">
          <button className="relative text-foreground h-9 w-9 p-2">
            <span className="absolute top-0 right-1 h-1.5 w-1.5 bg-accent rounded-full" />
            <Bell size={18} className="m-auto" />
          </button>
          {!isLoading && (
            <button onClick={onClick} className="rounded-full relative h-9 w-9 overflow-hidden">
              {organization?.image ? (
                <Image
                  src={organization.image}
                  alt="Profile Picture"
                  fill
                  className="object-cover"
                />
              ) : (
                <User size={18} className="m-auto" />
              )}
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};
