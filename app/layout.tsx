import type { Metadata } from "next";
import { DM_Sans as FontSans } from "next/font/google";
import { Toaster } from "react-hot-toast";

import "./globals.css";

import { cn } from "@/lib/utils";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BottomNavigation } from "@/components/bottom-navigation";
import { ModalProvider } from "@/providers/modal-provider";
import { AuthProvider } from "@/providers/auth-provider";
import { auth } from "@/auth";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "InternHub",
  description:
    "InternHub is a platform for finding internships. It is a place where students can find internships and companies can find interns.",
  keywords: ["internship", "intern", "job", "work", "student", "company"],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <AuthProvider session={session}>
      <html lang="en">
        <body className={cn("min-h-screen antialiased font-sans bg-background", fontSans.variable)}>
          <Header />
          <main className="w-full px-6 lg:px-0 md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto">
            {children}
          </main>
          <Footer />
          <ModalProvider />
          <Toaster />
          <BottomNavigation />
        </body>
      </html>
    </AuthProvider>
  );
}
