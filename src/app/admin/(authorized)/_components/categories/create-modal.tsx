"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { showResponseMessage } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Form } from "@/components/ui/form";
import { CategorySchema } from "@/lib/schema";
import { InputField } from "@/components/common/input";
import { LoadingButton } from "@/components/common/loading-button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { useState } from "react";
import { createCategoryAction } from "@/server/categories";

export const CreateCategoryModal = () => {
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(CategorySchema.Create),
    defaultValues: {
      name: "",
      description: ""
    }
  });

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof CategorySchema.Create>) => createCategoryAction(data),
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
        <Button icon={Plus} variant='outline'>
          Create
        </Button>
      </DialogTrigger>
      <DialogContent className='min-w-[500px]'>
        <DialogHeader>
          <DialogTitle>Create New Category</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
            <InputField placeholder='Name' control={form.control} name='name' label='Name' />
            <InputField
              placeholder='Description'
              control={form.control}
              name='description'
              label='Description'
              isTextarea
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
