"use client";

import React, { use, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  BarChart2,
  FileText,
  Users,
  ActivitySquare,
  MessageSquare,
  ShoppingCart,
  LockIcon,
  User2,
  Building2,
  ListIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { AdminContext } from "@/providers/auth-provider";
import { adminRoutes } from "../../_helpers/routes";

export const AdminSidebar = () => {
  const menuItems = [
    {
      title: "Logs and Statistics",
      icon: BarChart2,
      path: adminRoutes.stats.root
    },
    {
      title: "Content Management",
      icon: FileText,
      path: adminRoutes.sections.root
    },
    {
      title: "User Management",
      icon: Users,
      path: adminRoutes.users.root
    },
    {
      title: "News & Latest News",
      icon: MessageSquare,
      path: adminRoutes.blogs.root
    },
    {
      title: "Products",
      icon: ShoppingCart,
      path: adminRoutes.products.root
    },
    {
      title: "Categories",
      icon: ListIcon,
      path: adminRoutes.categories.root
    },
    {
      title: "Admins",
      icon: LockIcon,
      path: adminRoutes.admins.root
    },
    {
      title: "Partners",
      icon: User2,
      path: adminRoutes.partners.root
    },
    {
      title: "Company Reviews",
      icon: Building2,
      path: adminRoutes.reviews.root
    },
    {
      title: "Employee Activity",
      icon: ActivitySquare,
      path: adminRoutes.employees.root
    },
    {
      title: "Suggestions & Feedback",
      icon: MessageSquare,
      path: adminRoutes.suggestions.root
    }
  ];

  const admin = use(AdminContext);

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-background border-r shadow-sm transition-all duration-300"
      )}
    >
      {/* Header */}
      <div className='p-4 pb-2 flex justify-between items-center'>
        <h2 className={cn("font-semibold transition-opacity")}>Admin Panel</h2>
      </div>

      {/* Navigation */}
      <ScrollArea className='flex-1 px-3'>
        <div className='space-y-2 py-2'>
          {menuItems.map((item) => (
            <Link
              href={item.path}
              key={item.path}
              className={cn(
                "w-full flex gap-4 items-center hover:bg-accent text-black p-1 px-2 rounded-md text-sm"
              )}
            >
              <item.icon className={cn("h-4 w-4")} />
              {item.title}
            </Link>
          ))}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className={cn("border-t p-4 gap-4", "flex")}>
        <div className='w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center'>
          <Users className='h-4 w-4 text-primary' />
        </div>

        <div className='flex flex-col'>
          <span className='text-sm font-medium'>{admin?.name}</span>
          <span className='text-xs text-muted-foreground'>{admin?.email}</span>
        </div>
      </div>
    </div>
  );
};
