"use client";

import { useContext } from "react";
import { LanguageContext } from "@/providers/language";

import { FullOrder } from "@/types/app";
import { OrderTracker } from "./order-tracker";
import { OrderSummaryCard } from "./order-summary-card";
import { ProfileTitle } from "./profile-title";

type Props = {
  order: FullOrder | null;
};

export const CurrentOrderBlock = ({ order }: Props) => {
  const language = useContext(LanguageContext);
  if (!order) return null;

  return (
    <div className='my-4 mt-0'>
      <ProfileTitle title='Just Ordered' />
      <OrderTracker currentStatus={order.status} />
      <div className='grid xl:grid-cols-3 gap-4 mt-6'>
        <OrderSummaryCard order={order} />
      </div>
    </div>
  );
};
