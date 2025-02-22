"use client";

import React from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart, removeFromCart } from "@/store/slices/cart.slice";

import { Button } from "@/components/ui/button";
import { Check, ShoppingCart } from "lucide-react";
import { Product } from "@prisma/client";
import { ClassValue } from "class-variance-authority/types";
import { cn } from "@/lib/utils";

type Props = { item: Product; children?: React.ReactNode; className?: ClassValue };

export const AddToCart = ({ item, children, className }: Props) => {
  const cart = useAppSelector((state) => state.cart);
  const isItemAdded = cart.find((x) => x.id == item.id);
  const dispatch = useAppDispatch();

  const handleAdd = () => {
    dispatch(
      addToCart({
        id: item.id,
        name: item.name,
        quantity: 1,
        unitPrice: item.price ?? 0,
        totalPrice: item.price ?? 0
      })
    );
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  if (isItemAdded) {
    return (
      <Button className={cn(className)} onClick={handleRemove} icon={Check}>
        {children}
      </Button>
    );
  }

  return (
    <Button className={cn(className)} onClick={handleAdd} variant='outline' icon={ShoppingCart}>
      {children}
    </Button>
  );
};
