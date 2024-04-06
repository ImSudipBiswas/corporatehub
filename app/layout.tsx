import type { Metadata } from "next";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { DM_Sans as FontSans } from "next/font/google";
import { Toaster } from "react-hot-toast";

import "./globals.css";

import { cn } from "@/lib/utils";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BottomNavigation } from "@/components/bottom-navigation";
import { ModalProvider } from "@/providers/modal-provider";
import { AuthProvider } from "@/providers/auth-provider";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { auth } from "@/auth";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "CorporateHub",
  description:
    "CorporateHub is a platform for finding jobs. It is a place where students can find jobs and companies can find employees.",
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
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
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
