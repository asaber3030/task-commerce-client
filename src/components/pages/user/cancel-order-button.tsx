"use client";

import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { toast } from "react-toastify";
import { cancelOrderAction } from "@/server/users";

import { Button } from "@/components/ui/button";
import { LanguageContext } from "@/providers/language";
import { FullOrder } from "@/types/app";
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
import { useRouter } from "next/navigation";
import { routes } from "@/lib/routes";
import { useTranslate } from "@/hooks/use-translate";

type Props = {
  order: FullOrder;
};

export const CancelOrderButton = ({ order }: Props) => {
  const translate = useTranslate();
  const router = useRouter();

  const cancelMutation = useMutation({
    mutationFn: () => cancelOrderAction(order.id),
    onSuccess: (data: any) => {
      toast.success(data?.message);
      if (data?.status === 200) {
        router.push(routes.profile("orders"));
      }
    },
    onError: () => toast.error("Failed to cancel!")
  });

  if (order.statusNumber > 2) return null;

  const handleCancel = () => {
    cancelMutation.mutate();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='destructive'>{translate("cancelOrder")}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleCancel}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
