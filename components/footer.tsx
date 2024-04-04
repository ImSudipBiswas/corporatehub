"use client";

import Link from "next/link";
import { ChevronDown, Globe } from "lucide-react";

import { useModal } from "@/hooks/use-modal-store";
import { useAuth } from "@/hooks/use-auth";
import { footerLinks } from "@/lib/constants";

export const Footer = () => {
  const { onOpen } = useModal();
  const { isAuth } = useAuth();

  return (
    <footer className="w-full border-t max-sm:pb-16">
      <div className="w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto">
        <div className="px-4 md:px-6 py-2 md:py-4 lg:py-6 lg:px-0 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
          {footerLinks.map((section) => (
            <div key={section.heading} className="py-4 px-2">
              <h4 className="font-bold text-lg mb-3">{section.heading}</h4>
              <ul className="flex flex-col gap-1.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.label === "Post your job" && !isAuth ? (
                      <p
                        className="cursor-pointer text-sm sm:text-[15px] text-muted-foreground"
                        onClick={() => onOpen("sign-in")}
                      >
                        {link.label}
                      </p>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm sm:text-[15px] text-muted-foreground"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="text-xs text-muted-foreground px-6 lg:px-0 py-2 md:py-3 border-t w-full flex max-md:flex-col items-center justify-between">
          <div className="flex max-sm:flex-col items-center sm:gap-3 h-full">
            <div className="flex items-center gap-3">
              <Link href="#" className="font-bold p-2">
                Privacy policy
              </Link>
              <Link href="#" className="font-bold p-2">
                License
              </Link>
              <Link href="#" className="font-bold p-2">
                API
              </Link>
            </div>
            <p className="p-2 font-medium">
              &copy; {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
          <div className="flex items-center font-medium gap-3">
            <button className="flex items-center p-2">
              Currency - USD <ChevronDown className="h-4 w-4 ml-2" />
            </button>
            <button className="flex items-center p-2">
              English <Globe className="h-4 w-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
