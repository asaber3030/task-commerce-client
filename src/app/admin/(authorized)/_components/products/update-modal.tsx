"use client";

import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { updateProductAction } from "@/server/products";
import { showResponseMessage } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { LoadingButton } from "@/components/common/loading-button";
import { ProductSchema } from "@/lib/schema";
import { InputField } from "@/components/common/input";
import { FileField } from "@/components/common/file-field";
import { Product } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Edit, Plus } from "lucide-react";
import { Form } from "@/components/ui/form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

export const UpdateProductModal = ({ product }: { product: Product }) => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const form = useForm({
    resolver: zodResolver(ProductSchema.Update),
    defaultValues: {
      name: product.name || "",
      description: product.description || "",
      price: product.price || 0
    }
  });

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof ProductSchema.Update>) =>
      updateProductAction(product.id, data, file),
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
              placeholder='Price'
              control={form.control}
              name='price'
              label='Price'
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
