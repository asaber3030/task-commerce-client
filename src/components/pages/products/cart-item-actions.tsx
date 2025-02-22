"use client";

import { Button } from "@/components/ui/button";

import { useAppDispatch } from "@/store/hooks";
import { decreaseQuantity, increaseQuantity, removeFromCart } from "@/store/slices/cart.slice";

import { QuantityHandlerButtons } from "./quantity-handler";

type Props = {
  itemId: number;
  quantity: number;
};

export const CartItemActions = ({ itemId, quantity }: Props) => {
  const dispatch = useAppDispatch();

  const handleDecrease = () => {
    dispatch(decreaseQuantity(itemId));
  };

  const handleIncrease = () => {
    dispatch(increaseQuantity(itemId));
  };

  return (
    <div className='flex items-center justify-between'>
      <QuantityHandlerButtons
        quantity={quantity}
        onDecreaseQuantity={handleDecrease}
        onIncreaseQuantity={handleIncrease}
      />
    </div>
  );
};
