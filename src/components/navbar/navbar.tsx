"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Heart, Search, User } from "lucide-react";
import { Logo } from "../app/logo";
import { ShoppingCartDropdown } from "../app/shopping-cart";
import { LinkBtn } from "../common/link-button";
import { LanguageChangerDropdown } from "../common/language-switcher";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className='w-full border-b bg-white max-w-full'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-wrap items-center justify-between h-16'>
          {/* Logo */}
          <div className='flex-shrink-0'>
            <Logo />
          </div>

          {/* Navigation Links */}
          <div className='hidden xl:flex items-center space-x-8'>
            <Link href='/' className='text-gray-700 hover:text-gray-900'>
              Home
            </Link>
            <Link href='/products' className='text-gray-700 hover:text-gray-900'>
              Products
            </Link>

            <Link href='/about' className='text-gray-700 hover:text-gray-900'>
              About Us
            </Link>
            <Link href='/contact' className='text-gray-700 hover:text-gray-900'>
              Contact
            </Link>
            <Link href='/faq' className='text-gray-700 hover:text-gray-900'>
              FAQ
            </Link>
          </div>

          {/* Right Side Icons */}
          <div className='xl:flex items-center gap-4 hidden'>
            <LanguageChangerDropdown />

            <div className='relative'>
              <input
                type='search'
                placeholder='Search for products, art...'
                className='pl-3 pr-10 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
              <Button variant='ghost' size='icon' className='absolute right-0 top-0 h-full px-3'>
                <Search className='h-4 w-4 text-gray-500' />
              </Button>
            </div>

            <LinkBtn variant='ghost' href='/login'>
              <User className='h-5 w-5 text-gray-700' />
            </LinkBtn>

            <ShoppingCartDropdown />

            <LinkBtn variant='ghost' href='/favourites'>
              <Heart className='h-5 w-5 text-gray-700' />
            </LinkBtn>
          </div>
        </div>
      </div>
    </nav>
  );
};
