import { AdminLoginForm } from "@/components/admin/auth/login-form";
import { routes } from "@/lib/routes";
import { getAdmin } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function AdminLoginPage() {
  const admin = await getAdmin();
  if (admin) return redirect(routes.adminDashboard);

  return (
    <div className='min-h-screen flex items-center justify-center bg-blue-50'>
      <div className='w-full max-w-md'>
        <AdminLoginForm />
      </div>
    </div>
  );
}
