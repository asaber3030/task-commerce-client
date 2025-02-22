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
import { BlogSchema, UserSchema } from "@/lib/schema";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { Form } from "@/components/ui/form";
import { Blog, User } from "@prisma/client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { updateBlogAction } from "@/server/blogs";
import { FileField } from "@/components/common/file-field";

type Props = {
  blog: Blog;
};

export const UpdateBlogModal = ({ blog }: Props) => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const form = useForm({
    resolver: zodResolver(BlogSchema.Update),
    defaultValues: {
      title: blog.title,
      content: blog.content,
      description: blog.description,
      tags: blog.tags,
      keywords: blog.keywords
    }
  });

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof BlogSchema.Update>) => updateBlogAction(blog.id, data, file),
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
      <DialogContent className='min-w-[700px]'>
        <DialogHeader>
          <DialogTitle>
            Update Blog - <b>{blog.title}</b>
          </DialogTitle>
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
                Create
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
