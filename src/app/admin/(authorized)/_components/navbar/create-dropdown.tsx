"use client";

import { Plus, Book, Search, LockIcon, Cog, Folder, HomeIcon, Heading1Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { adminRoutes } from "../../_helpers/routes";
import Home from "@/app/(app)/page";

export const CreateNavbarDropdown = () => {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' className='relative '>
          <Cog className='h-5 w-5' />
          <span>Application</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-[400px]' align='end' forceMount>
        <DropdownMenuItem onClick={() => router.push(adminRoutes.careers.root)}>
          <Heading1Icon className='mr-2 h-4 w-4' />
          <span>Careers</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => router.push(adminRoutes.projects.root)}>
          <Folder className='mr-2 h-4 w-4' />
          <span>Projects</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => router.push(adminRoutes.blogs.root)}>
          <Book className='mr-2 h-4 w-4' />
          <span>Blogs</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => router.push(adminRoutes.admins.root)}>
          <LockIcon className='mr-2 h-4 w-4' />
          <span>Admins</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => router.push(adminRoutes.seo.root)}>
          <Search className='mr-2 h-4 w-4' />
          <span>Pages SEO</span>
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => router.push(adminRoutes.sections.root)}>
          <HomeIcon className='mr-2 h-4 w-4' />
          <span>Pages Sections & Translations</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
