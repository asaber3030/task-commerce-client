"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";

import { removeFromCart } from "@/store/slices/cart.slice";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { CartItem } from "@/types";

type Props = { item: CartItem };

export const RemoveFromCartButton = ({ item }: Props) => {
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  return (
    <Button onClick={handleRemove} size='sm' variant='outline'>
      <Check className='size-4' />
    </Button>
  );
};
