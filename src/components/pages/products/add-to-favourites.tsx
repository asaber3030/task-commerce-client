"use client";

import React from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToFavourties, removeFromFavourites } from "@/store/slices/favs.slice.ts";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { ClassValue } from "class-variance-authority/types";
import { cn } from "@/lib/utils";

type Props = { itemId: number; children?: React.ReactNode; className?: ClassValue };

export const AddToFavourites = ({ itemId, children, className }: Props) => {
  const favorites = useAppSelector((state) => state.favourites);
  const isItemAdded = favorites.includes(itemId);
  const dispatch = useAppDispatch();

  const handleAdd = () => {
    dispatch(addToFavourties(itemId));
  };

  const handleRemove = () => {
    dispatch(removeFromFavourites(itemId));
  };

  if (isItemAdded) {
    return (
      <Button className={cn(className)} onClick={handleRemove} variant='outline'>
        <Heart className='size-4' fill='red' stroke='red' />
        {children}
      </Button>
    );
  }

  return (
    <Button className={cn(className)} onClick={handleAdd} variant='outline' icon={Heart}>
      {children}
    </Button>
  );
};
