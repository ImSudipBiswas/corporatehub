import type { Metadata } from "next";
import { DM_Sans as FontSans } from "next/font/google";

import "./globals.css";

import { cn } from "@/lib/utils";
import { Header } from "@/components/header";
import { BottomNavigation } from "@/components/buttom-navigation";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "InternHub",
  description:
    "InternHub is a platform for finding internships. It is a place where students can find internships and companies can find interns.",
  keywords: ["internship", "intern", "job", "work", "student", "company"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen antialiased font-sans bg-background", fontSans.variable)}>
        <Header />
        {children}
        <BottomNavigation />
      </body>
    </html>
  );
}
