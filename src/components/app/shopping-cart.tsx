"use client";

import Link from "next/link";
import React from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useContext } from "react";

import { emptyCart } from "@/store/slices/cart.slice";
import { trigger } from "@/store/slices/shopping-cart-sheet.slice";
import { routes } from "@/lib/routes";

import { ShoppingCart } from "lucide-react";
import { EmptyState } from "@/app/admin/(authorized)/_components/empty-state";
import { Button } from "@/components/ui/button";
import { LanguageContext } from "@/providers/language";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { useTranslate } from "@/hooks/use-translate";
import { CartItemCard } from "../pages/products/cart-item-card";

export const ShoppingCartDropdown = () => {
  const cart = useAppSelector((state) => state.cart);
  const translate = useTranslate();

  const dispatch = useAppDispatch();
  const language = useContext(LanguageContext);

  const isOpen = useAppSelector((state) => state.shoppingCartSheet);

  const emptyAll = () => {
    dispatch(emptyCart());
  };

  return (
    <Sheet open={isOpen} onOpenChange={() => dispatch(trigger())}>
      <SheetTrigger asChild>
        <Button variant='ghost' className='relative h-10'>
          <ShoppingCart className='size-4' />
          <Badge
            className='absolute -top-2 -right-1 rounded-full p-0 size-6 text-sm flex items-center justify-center'
            variant='destructive'
          >
            {cart.length}
          </Badge>
        </Button>
      </SheetTrigger>

      <SheetContent className='xl:min-w-[28%] min-w-[90%] w-[90%] h-[100vh] overflow-auto'>
        <SheetHeader className='my-4'>
          <SheetTitle className='flex justify-between text-3xl items-center'>
            <span>{translate("shoppingCart")}</span>{" "}
            <span className='text-gray-500 text-sm'>
              {cart.length} {translate("items")}
            </span>
          </SheetTitle>
        </SheetHeader>
        {cart.length === 0 ? (
          <EmptyState />
        ) : (
          <div className='space-y-4'>
            {cart?.length > 0 && (
              <div>
                <h2 className='text-lg font-semibold mb-2'>{translate("items")}</h2>
                <div className='grid gap-2'>
                  {cart?.map((item) => (
                    <CartItemCard key={`item-cart-${item.id}`} item={item} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <SheetFooter className='grid grid-cols-2 gap-1 space-x-1 justify-between mt-4 mb-10'>
          <Button variant='outline' className='w-full' onClick={emptyAll}>
            {translate("emptyCart")}
          </Button>
          <Link href={routes.completeOrder} className='w-full' onClick={() => dispatch(trigger())}>
            <Button className='w-full'>{translate("order")}</Button>
          </Link>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
