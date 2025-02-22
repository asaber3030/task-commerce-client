"use client";

import { useContext } from "react";

import { LanguageContext } from "@/providers/language";
import { LoadingButton } from "@/components/common/loading-button";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { useTranslate } from "@/hooks/use-translate";

type Props = {
  loading: boolean;
  onSubmit: () => void;
};

export const CompleteOrderButton = ({ loading, onSubmit }: Props) => {
  const translate = useTranslate();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='outline' className='w-full'>
          {translate("completeOrder")}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{translate("completeOrder")}</AlertDialogTitle>
          <AlertDialogDescription>{translate("completeOrderDescription")}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className='flex gap-2'>
          <AlertDialogCancel asChild>
            <Button variant='outline'>{translate("cancel")}</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <LoadingButton onClick={onSubmit} loading={loading} variant='outline'>
              {translate("completeOrder")}
            </LoadingButton>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
