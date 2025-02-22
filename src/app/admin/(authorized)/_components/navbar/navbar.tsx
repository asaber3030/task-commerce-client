"use client";

import { routes } from "@/lib/routes";

import { CreateNavbarDropdown } from "./create-dropdown";
import { AdminNavbarDropdown } from "./admin-dropdown";
import { Logo } from "@/components/app/logo";

export const AdminNavbar = () => {
  return (
    <nav className='bg-white border-b border-gray-200 px-4 py-2.5'>
      <div className='flex flex-wrap justify-between items-center max-w-screen-2xl mx-auto'>
        <Logo href={routes.adminDashboard} />
        <div className='flex items-center gap-2'>
          <AdminNavbarDropdown />
          <CreateNavbarDropdown />
        </div>
      </div>
    </nav>
  );
};
