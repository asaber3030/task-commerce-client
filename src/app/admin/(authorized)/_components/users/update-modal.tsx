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
import { UserSchema } from "@/lib/schema";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { Form } from "@/components/ui/form";
import { User } from "@prisma/client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

type Props = {
  user: User;
};

export const UpdateUserModal = ({ user }: Props) => {
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(UserSchema.Update),
    defaultValues: {
      name: user.name,
      email: user.email
    }
  });

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof UserSchema.Update>) => updateUserAction(user.id, data),
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
            Update User - <b>{user.name}</b>
          </DialogTitle>
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
