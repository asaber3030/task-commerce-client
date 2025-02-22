"use client";

import Image from "next/image";

import { useContext } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { decreaseQuantity, increaseQuantity, removeFromCart } from "@/store/slices/cart.slice";

import { LanguageContext } from "@/providers/language";
import { CartItem } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useTranslate } from "@/hooks/use-translate";
import { EmptyState } from "@/app/admin/(authorized)/_components/empty-state";
import { QuantityHandlerButtons } from "../products/quantity-handler";

export const OrderProducts = () => {
  const language = useContext(LanguageContext);
  const productsCart = useAppSelector((state) => state.cart);
  const translate = useTranslate();

  const dispatch = useAppDispatch();

  const onIncrease = (item: CartItem) => {
    dispatch(increaseQuantity(item.id));
  };

  const onDecrease = (item: CartItem) => {
    dispatch(decreaseQuantity(item.id));
  };

  const removeFromCartHandler = (itemId: number) => {
    dispatch(removeFromCart(itemId));
  };

  return (
    <div>
      <h3 className='text-xl font-bold mb-2'>{translate("products")}</h3>

      {productsCart.length === 0 ? (
        <EmptyState title={translate("noData")} />
      ) : (
        <Table className='border shadow-none'>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[100px]'>{translate("image")}</TableHead>
              <TableHead>{translate("name")}</TableHead>
              <TableHead>{translate("quantity")}</TableHead>
              <TableHead>{translate("unitPrice")}</TableHead>
              <TableHead>{translate("totalPrice")}</TableHead>
              <TableHead>{translate("action")}</TableHead>
              <TableHead>{translate("remove")}</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {productsCart.map((item) => (
              <TableRow key={`cart-product-${item.id}`}>
                <TableCell className='font-medium'>
                  <Image
                    src={"/bg.webp"}
                    alt='Product'
                    width={100}
                    height={100}
                    className='rounded-md mx-auto object-contain'
                  />
                </TableCell>

                <TableCell>{item.name}</TableCell>
                <TableCell>x{item.quantity}</TableCell>

                <TableCell className='text-green-700 font-bold'>
                  {item.unitPrice} {translate("le")}
                </TableCell>

                <TableCell className='text-green-700 font-bold'>
                  {item.totalPrice} {translate("le")}
                </TableCell>

                <TableCell>
                  <QuantityHandlerButtons
                    quantity={item.quantity}
                    onIncreaseQuantity={() => onIncrease(item)}
                    onDecreaseQuantity={() => onDecrease(item)}
                  />
                </TableCell>

                <TableCell>
                  <Button
                    icon={X}
                    variant='destructive'
                    onClick={() => removeFromCartHandler(item.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};
