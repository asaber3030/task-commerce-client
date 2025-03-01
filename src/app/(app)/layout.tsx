import Footer from "@/components/app/footer";
import { LinkBtn } from "@/components/common/link-button";
import { Navbar } from "@/components/navbar/navbar";
import { Search } from "lucide-react";
import Link from "next/link";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <Link
        className='bg-blue-500 text-white size-16 flex items-center justify-center fixed right-4 bottom-4 rounded-full animate-pulse'
        href='/filter'
      >
        <Search />
      </Link>
    </>
  );
}
