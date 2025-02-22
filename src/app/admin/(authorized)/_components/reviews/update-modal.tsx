"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { showResponseMessage } from "@/lib/utils";
import { updateReviewAction } from "@/server/reviews";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { LoadingButton } from "@/components/common/loading-button";
import { ReviewSchema } from "@/lib/schema";
import { InputField } from "@/components/common/input";
import { FileField } from "@/components/common/file-field";
import { Review } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { Form } from "@/components/ui/form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

export const UpdateReviewModal = ({ review }: { review: Review }) => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const form = useForm({
    resolver: zodResolver(ReviewSchema.Update),
    defaultValues: {
      name: review.name || "",
      description: review.description || "",
      rating: review.rating || 0
    }
  });

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof ReviewSchema.Update>) =>
      updateReviewAction(review.id, data, file),
    onSuccess: (data) =>
      showResponseMessage(data, () => {
        setOpen(false);
      })
  });

  const handleSubmit = () => {
    mutation.mutate(form.getValues());
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button icon={Edit}>Update</Button>
      </DialogTrigger>
      <DialogContent className='min-w-[500px]'>
        <DialogHeader>
          <DialogTitle>Update Product</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
            <FileField onChange={setFile} label='Image' accept='image/*' />
            <InputField placeholder='Name' control={form.control} name='name' label='Name' />
            <InputField
              placeholder='Rating'
              control={form.control}
              name='rating'
              label='Rating'
              valuseAsNumber
            />
            <InputField
              isTextarea
              placeholder='Description'
              control={form.control}
              name='description'
              label='Description'
            />
            <div className='flex gap-2'>
              <LoadingButton loading={mutation.isPending} type='submit'>
                Save
              </LoadingButton>
              <DialogClose asChild>
                <Button variant='outline'>Close</Button>
              </DialogClose>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
