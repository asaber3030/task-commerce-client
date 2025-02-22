import Footer from "@/components/app/footer";
import { Navbar } from "@/components/navbar/navbar";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
