"use client";

import { useContext } from "react";
import { LanguageContext } from "@/providers/language";

import { formatDate } from "@/lib/utils";
import { FullOrder } from "@/types/app";
import { useTranslate } from "@/hooks/use-translate";

type Props = {
  order: FullOrder;
};

export const OrderSummaryCard = ({ order }: Props) => {
  const translate = useTranslate();

  return (
    <li className='p-4 rounded-md border h-fit list-none bg-white'>
      <h3 className='text-center mb-2 font-bold'>{translate("summary")}</h3>
      <ul className='w-full space-y-2'>
        <li className='w-full text-sm flex justify-between items-center'>
          <span className='font-medium'>{translate("orderedAt")}</span>
          <span>{formatDate(order.orderedAt)}</span>
        </li>
        <li className='w-full text-sm flex justify-between items-center'>
          <span className='font-medium'>{translate("deliveryTaxes")}</span>
          <span className='text-green-800 font-bold'>
            {order.deliveryValue} {translate("le")}
          </span>
        </li>
        <li className='w-full text-sm flex justify-between items-center'>
          <span className='font-medium'>{translate("discount")}</span>
          <span className='text-green-800 font-bold'>
            {order.discountValue} {translate("le")}
          </span>
        </li>
        <li className='w-full text-sm flex justify-between items-center'>
          <span className='font-medium'>{translate("subTotal")}</span>
          <span className='text-green-800 font-bold'>
            {order.subTotal} {translate("le")}
          </span>
        </li>
        <li className='w-full text-sm flex justify-between items-center'>
          <span className='font-medium'>{translate("total")}</span>
          <span className='text-green-800 font-bold'>
            {order.total} {translate("le")}
          </span>
        </li>
      </ul>
    </li>
  );
};
