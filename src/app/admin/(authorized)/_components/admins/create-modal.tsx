"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { updatePageTranslationAction } from "@/server/pages";
import { showResponseMessage } from "@/lib/utils";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Edit, Plus } from "lucide-react";
import { Form } from "@/components/ui/form";
import { AdminSchema, PageSEOSchema } from "@/lib/schema";
import { FullPage } from "@/types/app";
import { InputField } from "@/components/common/input";
import { LoadingButton } from "@/components/common/loading-button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Admin } from "@prisma/client";
import { createAdminAction, updateAdminAction } from "@/server/admins";
import { useState } from "react";

export const CreateAdminModal = () => {
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(AdminSchema.Create),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  });

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof AdminSchema.Create>) => createAdminAction(data),
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
          <DialogTitle>Create New Admin Admin</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
            <InputField placeholder='Name' control={form.control} name='name' label='Name' />
            <InputField
              placeholder='Email'
              control={form.control}
              name='email'
              label='E-mail Address'
            />
            <InputField
              placeholder='Password'
              control={form.control}
              name='password'
              label='Password'
              type='password'
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
