import "./style.css";

import { routes } from "@/lib/routes";
import { redirect } from "next/navigation";

import { getAdmin } from "@/server/auth";
import { AdminNavbar } from "./_components/navbar/navbar";
import { AuthProvider } from "@/providers/auth-provider";
import { TableSkeleton } from "@/components/common/table-skeleton";
import { AdminSidebar } from "./_components/navbar/sidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await getAdmin();
  if (!admin) return redirect(routes.adminLogin);

  return (
    <AuthProvider admin={admin}>
      <div className='grid grid-cols-7'>
        <div className='col-span-1'>
          <AdminSidebar />
        </div>
        <div className='col-span-6'>
          <AdminNavbar />
          <main className='max-w-screen-2xl py-10 mx-auto px-8'>{children}</main>
        </div>
      </div>
    </AuthProvider>
  );
}
