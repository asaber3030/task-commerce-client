"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { showResponseMessage } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Form } from "@/components/ui/form";
import { BlogSchema } from "@/lib/schema";
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
import { FileField } from "@/components/common/file-field";
import { createBlogAction } from "@/server/blogs";

export const CreateBlogModal = () => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const form = useForm({
    resolver: zodResolver(BlogSchema.Create),
    defaultValues: {
      title: "",
      content: "",
      description: "",
      tags: "",
      keywords: ""
    }
  });

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof BlogSchema.Create>) => createBlogAction(data, file),
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
          <DialogTitle>Create New User</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
            <InputField placeholder='Title' label='title' name='title' control={form.control} />
            <InputField
              placeholder='Description'
              label='description'
              name='description'
              control={form.control}
            />
            <InputField
              placeholder='Content'
              label='content'
              name='content'
              control={form.control}
            />
            <InputField
              placeholder='Keywords'
              label='keywords'
              name='keywords'
              control={form.control}
            />
            <InputField placeholder='Tags' label='tags' name='tags' control={form.control} />
            <FileField label='Image' onChange={setFile} />
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
