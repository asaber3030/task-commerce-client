"use client";

import { User, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useAdmin } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
import { routes } from "@/lib/routes";
import { adminRoutes } from "../../_helpers/routes";

export const AdminNavbarDropdown = () => {
  const admin = useAdmin();
  const router = useRouter();

  const handleLogout = () => {
    deleteCookie("token");
    router.push(routes.adminLogin);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className='relative '>
          <User className='h-5 w-5' />
          <span>{admin?.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-56'
        align='end'
        forceMount
        onClick={() => router.push(adminRoutes.settings.root)}
      >
        <DropdownMenuItem>
          <Settings className='mr-2 h-4 w-4' />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className='mr-2 h-4 w-4' />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
