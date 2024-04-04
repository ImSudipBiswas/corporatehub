import { Footer } from "@/components/footer";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="w-full px-6 lg:px-0 md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto">
        {children}
      </main>
      <Footer />
    </>
  );
}
