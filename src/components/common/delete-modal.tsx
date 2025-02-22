"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

import { showResponseMessage } from "@/lib/utils";

import { APIResponse } from "@/types";
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

interface Props {
  deletedId: number;
  dialogTitle?: string;
  dialogDescription?: string;
  children?: React.ReactNode;
  asChild?: boolean;
  forceAction: (id: number) => Promise<APIResponse<any, any>>;
}

export const DeleteModal = ({
  dialogTitle = "Delete Action",
  dialogDescription = "This action can be reversed later because of soft deletes but you can force delete this item.",
  deletedId,
  children,
  asChild = true,
  forceAction
}: Props) => {
  const [open, setOpen] = useState(false);

  const forceDeleteMutation = useMutation({
    mutationFn: () => forceAction(deletedId),
    onSuccess: (data) =>
      showResponseMessage(data, () => {
        setOpen(false);
      })
  });

  const handleDelete = () => {
    forceDeleteMutation.mutate();
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild={asChild}>
        <Button variant='destructive'>Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Please make sure before processing, This action is not reversible
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant='outline'>Cancel</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant='destructive' onClick={handleDelete}>
              Submit
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
