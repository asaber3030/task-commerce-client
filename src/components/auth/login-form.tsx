"use client";

import Link from "next/link";

import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { routes } from "@/lib/routes";
import { toast } from "react-toastify";
import { z } from "zod";

import { LanguageContext } from "@/providers/language";
import { CheckboxField } from "@/components/common/checkbox-field";
import { LoadingButton } from "@/components/common/loading-button";
import { Form } from "@/components/ui/form";
import { useTranslate } from "@/hooks/use-translate";
import { userSignIn } from "@/server/users";
import { LoginSchema } from "@/lib/schema";
import { InputField } from "../common/input";

export const LoginForm = () => {
  const router = useRouter();
  const translate = useTranslate();

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const loginMutation = useMutation({
    mutationFn: ({ values }: { values: z.infer<typeof LoginSchema> }) => userSignIn(values),
    onSuccess: (data) => {
      if (data?.status === 200) {
        toast.success(data.message);
        router.push(routes.home);
      } else {
        toast.error(data?.message);
      }
    }
  });

  const handleRegister = () => {
    loginMutation.mutate({
      values: form.getValues()
    });
  };

  return (
    <div className='xl:w-[50%] border bg-white shadow-md p-6 rounded-md mx-auto'>
      <header className='text-center mb-10'>
        <h1 className='text-4xl font-extrabold'>{translate("welcome")}</h1>
      </header>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleRegister)} className='space-y-4'>
          <InputField control={form.control} name='email' label={translate("email")} />
          <InputField
            control={form.control}
            name='password'
            type='password'
            label={translate("password")}
          />

          <CheckboxField control={form.control} name='rememberMe' label={translate("rememberMe")} />

          <LoadingButton className='w-full' loading={loginMutation.isPending}>
            {translate("login")}
          </LoadingButton>

          <Link
            href={routes.register}
            className='hover:underline text-secondaryMain text-sm block mx-auto text-center'
          >
            {translate("doesntHaveAccount")}
          </Link>
        </form>
      </Form>
    </div>
  );
};
