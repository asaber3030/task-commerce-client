"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LockIcon, MailIcon } from "lucide-react";
import { LoadingButton } from "@/components/common/loading-button";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "@/server/auth";
import { useForm } from "react-hook-form";

import { showResponseMessage } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/lib/schema";
import { z } from "zod";

import { InputField } from "@/components/common/input";
import { Form } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { routes } from "@/lib/routes";

export function AdminLoginForm() {
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: (data: z.infer<typeof LoginSchema>) => signIn(data),
    onSuccess: (data) =>
      showResponseMessage(data, () => {
        if (data?.status === 200) {
          router.push(routes.adminDashboard);
        }
      })
  });

  const handleSubmit = () => {
    loginMutation.mutate(form.getValues());
  };

  return (
    <Card className='w-full'>
      <CardHeader className='space-y-1'>
        <CardTitle className='text-2xl text-center'>Admin Login</CardTitle>
      </CardHeader>
      <CardContent className='grid gap-4'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-4'>
            <InputField name='email' label='Email' control={form.control} />
            <InputField name='password' label='Password' control={form.control} type='password' />
            <LoadingButton className='w-full' loading={loginMutation.isPending}>
              Login
            </LoadingButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
