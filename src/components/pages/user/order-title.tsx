"use client";

import { useContext } from "react";

import { CancelOrderButton } from "./cancel-order-button";
import { LanguageContext } from "@/providers/language";
import { FullOrder } from "@/types/app";
import { OrderStatus } from "@prisma/client";
import { Check } from "lucide-react";
import { useTranslate } from "@/hooks/use-translate";
import { ProfileTitle } from "./profile-title";

type Props = { order: FullOrder };

export const OrderTitle = ({ order }: Props) => {
  const language = useContext(LanguageContext);
  const translate = useTranslate();

  return (
    <ProfileTitle title={`${translate("order")} #${order.id}`}>
      <div className='flex gap-2'>
        {order.status === OrderStatus.Delivered && (
          <bdi className='text-green-700 font-bold flex gap-2 items-center'>
            <Check className='size-4' /> {translate("delivered")}
          </bdi>
        )}
        <CancelOrderButton order={order} />
      </div>
    </ProfileTitle>
  );
};
