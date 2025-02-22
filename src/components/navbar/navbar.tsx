"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { Heart, Menu, Search, User } from "lucide-react";
import { Logo } from "../app/logo";
import { ShoppingCartDropdown } from "../app/shopping-cart";
import { LinkBtn } from "../common/link-button";
import { LanguageChangerDropdown } from "../common/language-switcher";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

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
          <div className='hidden xl:flex items-center gap-8'>
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

          <div className='xl:hidden md:hidden flex gap-2'>
            <LanguageChangerDropdown />
            <ShoppingCartDropdown />

            <Sheet>
              <SheetTrigger asChild>
                <Button variant='ghost' size='icon'>
                  <Menu className='h-5 w-5' />
                </Button>
              </SheetTrigger>
              <SheetContent className='w-[300px] sm:w-[400px]'>
                <SheetHeader className='mb-6'>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>

                {/* Search Bar */}
                <div className='relative mb-6'>
                  <input
                    type='search'
                    placeholder='Search for products, art...'
                    className='w-full pl-3 pr-10 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                  <Button
                    variant='ghost'
                    size='icon'
                    className='absolute right-0 top-0 h-full px-3'
                  >
                    <Search className='h-4 w-4 text-gray-500' />
                  </Button>
                </div>

                {/* Navigation Links */}
                <div className='flex flex-col space-y-4'>
                  <Link href='/' className='text-lg font-medium text-gray-700 hover:text-gray-900'>
                    Home
                  </Link>
                  <Link
                    href='/products'
                    className='text-lg font-medium text-gray-700 hover:text-gray-900'
                  >
                    Products
                  </Link>
                  <Link
                    href='/about'
                    className='text-lg font-medium text-gray-700 hover:text-gray-900'
                  >
                    About Us
                  </Link>
                  <Link
                    href='/contact'
                    className='text-lg font-medium text-gray-700 hover:text-gray-900'
                  >
                    Contact
                  </Link>
                  <Link
                    href='/faq'
                    className='text-lg font-medium text-gray-700 hover:text-gray-900'
                  >
                    FAQ
                  </Link>
                </div>

                {/* User Actions */}
                <div className='mt-8 pt-6 border-t'>
                  <div className='flex flex-col space-y-4'>
                    <LinkBtn
                      href='/login'
                      linkClassName='flex items-center space-x-2 text-gray-700'
                    >
                      <User className='h-5 w-5' />
                      <span>Login / Register</span>
                    </LinkBtn>
                    <LinkBtn
                      href='/favourites'
                      linkClassName='flex items-center space-x-2 text-gray-700'
                    >
                      <Heart className='h-5 w-5' />
                      <span>Favorites</span>
                    </LinkBtn>
                    <LanguageChangerDropdown />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};
