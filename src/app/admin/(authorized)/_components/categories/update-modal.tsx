"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { showResponseMessage } from "@/lib/utils";
import { updateUserAction } from "@/server/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { LoadingButton } from "@/components/common/loading-button";
import { InputField } from "@/components/common/input";
import { CategorySchema, UserSchema } from "@/lib/schema";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { Form } from "@/components/ui/form";
import { Category, User } from "@prisma/client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { updateCategoryAction } from "@/server/categories";

type Props = {
  category: Category;
};

export const UpdateCategoryModal = ({ category }: Props) => {
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(CategorySchema.Update),
    defaultValues: {
      name: category.name,
      description: category.description ?? ""
    }
  });

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof CategorySchema.Update>) =>
      updateCategoryAction(category.id, data),
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
          <DialogTitle>
            Update Category - <b>{category.name}</b>
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
            <InputField placeholder='Name' control={form.control} name='name' label='Name' />
            <InputField
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
