import { Suspense } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingSidebar from "@/components/layout/FloatingSidebar";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense>
        <Header />
      </Suspense>
      <main>{children}</main>
      <Suspense>
        <FloatingSidebar />
      </Suspense>
      <Footer />
    </>
  );
}
