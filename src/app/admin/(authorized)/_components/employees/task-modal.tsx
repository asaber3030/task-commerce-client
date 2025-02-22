"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { showResponseMessage } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { CheckCheck, ListIcon, Plus } from "lucide-react";
import { Form } from "@/components/ui/form";
import { EmployeeSchema, PerformanceLogSchema, TaskSchema, UserSchema } from "@/lib/schema";
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
import { createUserAction } from "@/server/users";
import { useState } from "react";
import { createEmployeeAction } from "@/server/employees";
import { createPerformanceLogAction } from "@/server/performance-logs";
import { createTaskAction } from "@/server/tasks";
import { SelectField } from "@/components/common/select-field";
import { SelectItem } from "@/components/ui/select";

export const CreateTaskModal = ({ employeeId }: { employeeId: number }) => {
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(TaskSchema.Create),
    defaultValues: {
      title: "",
      description: "",
      status: "Pending"
    }
  });

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof TaskSchema.Create>) => createTaskAction(employeeId, data),
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
        <Button icon={CheckCheck} variant='outline'>
          Tasks
        </Button>
      </DialogTrigger>
      <DialogContent className='min-w-[500px]'>
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
            <InputField placeholder='Title' control={form.control} name='title' label='Title' />
            <InputField
              placeholder='Description'
              control={form.control}
              name='description'
              label='Description'
            />
            <SelectField control={form.control} label='Status' name='status'>
              <SelectItem value='Pending'>Pending</SelectItem>
              <SelectItem value='Done'>Done</SelectItem>
              <SelectItem value='Cancelled'>Cancelled</SelectItem>
            </SelectField>
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
