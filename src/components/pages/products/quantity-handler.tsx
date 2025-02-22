"use client";

import { LanguageContext } from "@/providers/language";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useContext } from "react";
import { cn } from "@/lib/utils";

type Props = {
  onIncreaseQuantity: () => void;
  onDecreaseQuantity: () => void;
  quantity: number;
};

export const QuantityHandlerButtons = ({
  quantity,
  onIncreaseQuantity,
  onDecreaseQuantity
}: Props) => {
  const language = useContext(LanguageContext);

  return (
    <div className='flex items-center'>
      <Button
        onClick={onIncreaseQuantity}
        className={cn("focus:ring-1" === "ar" ? "border-l-0" : "border-r-0")}
        style={{ borderRadius: language === "ar" ? "0 5px 5px 0" : "5px 0 0 5px" }}
        variant='outline'
        icon={Plus}
        size='icon'
      />
      <span className='border h-9 font-semibold flex items-center justify-center px-3 bg-white'>
        x{quantity ?? 1}
      </span>
      <Button
        onClick={onDecreaseQuantity}
        className={cn("focus:ring-1" === "ar" ? "border-r-0" : "border-l-0")}
        style={{ borderRadius: language === "ar" ? "5px 0 0 5px" : "0 5px 5px 0" }}
        variant='outline'
        icon={Minus}
        size='icon'
      />
    </div>
  );
};
