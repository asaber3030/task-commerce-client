"use client";

import { useAppDispatch } from "@/store/hooks";

import { Button } from "@/components/ui/button";
import { LanguageContext } from "@/providers/language";

import { emptyCart } from "@/store/slices/cart.slice";
import { useContext } from "react";
import { useTranslate } from "@/hooks/use-translate";

export const EmptyCartButton = () => {
  const dispatch = useAppDispatch();
  const language = useContext(LanguageContext);
  const translate = useTranslate();

  const handleEmpty = () => {
    dispatch(emptyCart());
  };

  return (
    <Button onClick={handleEmpty} variant='outline'>
      {translate("emptyCart")}
    </Button>
  );
};
