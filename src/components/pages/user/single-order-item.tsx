"use client";

import { useContext } from "react";
import { LanguageContext } from "@/providers/language";

import Image from "next/image";

import { OrderItem, Product } from "@prisma/client";
import { Separator } from "@/components/ui/separator";
import { useTranslate } from "@/hooks/use-translate";

type Props = {
  item: OrderItem & { product: Product };
};

export const SingleOrderItem = ({ item }: Props) => {
  const translate = useTranslate();
  return (
    <div className='p-2 border rounded-lg shadow-sm bg-white'>
      <Image
        className='mx-auto w-full object-cover rounded-md mb-4'
        alt='Sandwich'
        src={"/bg.webp"}
        width={150}
        height={150}
      />

      <ul className='space-y-2'>
        <li className='flex items-center justify-between text-sm'>
          <span className='font-medium'>{translate("quantity")}</span>
          <span className='text-secondaryMain'>x{item.quantity}</span>
        </li>
        <li className='flex items-center justify-between text-sm'>
          <span className='font-medium'>{translate("unitPrice")}</span>
          <span className='text-green-700 font-semibold'>
            {item.unitPrice} {translate("le")}
          </span>
        </li>
        <li className='flex items-center justify-between text-sm'>
          <span className='font-medium'>{translate("totalPrice")}</span>
          <span className='text-green-700 font-semibold'>
            {item.totalPrice} {translate("le")}
          </span>
        </li>
      </ul>
    </div>
  );
};
