"use client";

import Image from "next/image";

import { useContext } from "react";

import { CartItem } from "@/types";
import { CartItemActions } from "./cart-item-actions";
import { LanguageContext } from "@/providers/language";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useAppDispatch } from "@/store/hooks";
import { removeFromCart } from "@/store/slices/cart.slice";
import { useTranslate } from "@/hooks/use-translate";

type Props = {
  item: CartItem;
};

export const CartItemCard = ({ item }: Props) => {
  const dispatch = useAppDispatch();
  const translate = useTranslate();

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(item.id));
  };

  if (!item || !item.id) return null;

  return (
    <div className='py-2 transition-all' key={item?.id}>
      <div className='flex gap-4'>
        <div className='w-full'>
          <h2 className={cn("flex justify-between font-semibold xl:text-lg text-sm w-full")}>
            <span>{item.name}</span>
            <div className='flex flex-col justify-end'>
              <Button
                onClick={handleRemoveFromCart}
                className='w-fit p-0 border-none shadow-none hover:bg-transparent mb-1'
                icon={X}
                variant='outline'
              />
            </div>
          </h2>
          <div className='flex justify-between'>
            <p className={cn("text-sm flex gap-2 items-center")}>
              <span className='text-green-700 font-medium xl:text-lg text-sm'>
                {item.totalPrice} EGP
              </span>
            </p>
            <CartItemActions itemId={item.id} quantity={item.quantity} />
          </div>
        </div>
      </div>
    </div>
  );
};
