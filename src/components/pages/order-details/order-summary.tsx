"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { createOrder } from "@/server/users";
import { showResponseMessage } from "@/lib/utils";
import { toast } from "react-toastify";

import { OrderSummaryItem } from "./order-summary-item";
import { routes } from "@/lib/routes";
import { responseCodes } from "@/lib/api";
import { useTranslate } from "@/hooks/use-translate";
import { emptyCart } from "@/store/slices/cart.slice";
import { Button } from "@/components/ui/button";

export const OrderSummaryCard = () => {
  const translate = useTranslate();
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const router = useRouter();

  let subTotal = 0;
  let quantity = 0;

  cart.map((item) => {
    subTotal += item.totalPrice;
    quantity += item.quantity;
  });

  let discountValue = subTotal * 0;
  let deliveryValue = 20;

  const total = subTotal - discountValue + deliveryValue;

  const createOrderMutation = useMutation({
    mutationFn: () => createOrder(cart, deliveryValue),
    onSuccess: (data) => {
      showResponseMessage(data);
      if (data.status === responseCodes.created || data.status === responseCodes.ok) {
        dispatch(emptyCart());
        router.push(routes.profile("orders"));
      }
    }
  });

  const handleCreateOrder = () => {
    if (deliveryValue === 0) {
      toast.error(translate("noDeliveryPrice"));
      return;
    }

    if (cart.length === 0) {
      toast.error(translate("noProductsFound"));
      return;
    }

    createOrderMutation.mutate();
  };

  return (
    <div className='p-4 rounded-md shadow-sm bg-white'>
      <div className='pb-2 border-b mb-4'>
        <h3 className='text-lg font-semibold'>{translate("orderSummary")}</h3>
      </div>

      <ul className='space-y-4'>
        <OrderSummaryItem left={translate("totalProducts")} right={quantity} />

        <OrderSummaryItem
          left={translate("subTotal")}
          right={`${subTotal} ${translate("le")}`}
          rightClass='text-green-700'
        />

        <OrderSummaryItem
          left={`${translate("deliveryTaxes")}`}
          right={`${deliveryValue} ${translate("le")}`}
          rightClass='text-green-700'
        />

        <OrderSummaryItem
          left={translate("total")}
          right={`${total} ${translate("le")}`}
          rightClass='text-green-700'
        />
      </ul>

      <Button onClick={handleCreateOrder} className='w-full mt-4'>
        Place order
      </Button>
    </div>
  );
};
