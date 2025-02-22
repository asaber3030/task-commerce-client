"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { showResponseMessage } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { ListIcon, Plus } from "lucide-react";
import { Form } from "@/components/ui/form";
import { EmployeeSchema, PerformanceLogSchema, UserSchema } from "@/lib/schema";
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

export const CreatePerformanceLogModal = ({ employeeId }: { employeeId: number }) => {
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(PerformanceLogSchema.Create),
    defaultValues: {
      activity: "",
      duration: 0,
      rating: 0,
      responseTime: 0
    }
  });

  const mutation = useMutation({
    mutationFn: (data: z.infer<typeof PerformanceLogSchema.Create>) =>
      createPerformanceLogAction(employeeId, data),
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
        <Button icon={ListIcon} variant='outline'>
          Performance Log
        </Button>
      </DialogTrigger>
      <DialogContent className='min-w-[500px]'>
        <DialogHeader>
          <DialogTitle>Create New Performance Log</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
            <InputField
              placeholder='Activity'
              control={form.control}
              name='activity'
              label='Activity'
            />
            <InputField
              placeholder='Duration'
              control={form.control}
              name='duration'
              label='Duration'
              valuseAsNumber
            />
            <InputField
              placeholder='Response Time'
              control={form.control}
              name='responseTime'
              label='Response Time'
              valuseAsNumber
            />
            <InputField
              placeholder='Rating'
              control={form.control}
              name='rating'
              label='Rating'
              valuseAsNumber
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
