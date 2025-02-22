"use client";

import { useContext } from "react";

import { FullOrder } from "@/types/app";
import { OrderSummaryCard } from "./order-summary-card";
import { SingleOrderItem } from "./single-order-item";
import { OrderTitle } from "./order-title";
import { LanguageContext } from "@/providers/language";
import { OrderTracker } from "./order-tracker";
import { useTranslate } from "@/hooks/use-translate";
import { EmptyState } from "@/app/admin/(authorized)/_components/empty-state";

type Props = {
  order: FullOrder;
};

export const SingleOrder = ({ order }: Props) => {
  const translate = useTranslate();

  return (
    <div>
      <OrderTitle order={order} />

      <div className='mb-8'>
        <h2 className='font-semibold text-xl mb-2'>{translate("tracker")}</h2>
        <OrderTracker currentStatus={order.status} />
      </div>

      <div className='mb-4'>
        <h2 className='font-semibold text-xl mb-2'>{translate("orderedItems")}</h2>
        {order.items.length === 0 ? (
          <EmptyState title={translate("noData")} />
        ) : (
          <div className='grid xl:grid-cols-4 grid-cols-1 gap-2'>
            {order.items.map((item) => (
              <SingleOrderItem key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>

      <div className='mb-2'>
        <div className='mb-4'>
          <h2 className='font-semibold text-xl'>{translate("details")}</h2>
          <p className='text-sm text-gray-500 flex gap-1'>
            {translate("youHaveOrdered")}{" "}
            <span className='font-bold'>
              {order.items.length} {translate("items")}
            </span>
            <span>{translate("withTotalMoney")} </span>
            <span className='font-bold'>
              {order.total} {translate("le")}
            </span>
          </p>
          <ul className='mt-4 grid xl:grid-cols-4 grid-cols-1 gap-2'>
            <OrderSummaryCard order={order} />
          </ul>
        </div>
      </div>
    </div>
  );
};
