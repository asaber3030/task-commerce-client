"use server";

import z from "zod";

import { LoginSchema } from "@/lib/schema";
import { APIResponse } from "@/types";
import { Admin } from "@prisma/client";

import { API_URL, TOKEN_EXPIRATION_DATE } from "@/lib/constants";

import { getAuthorizationToken } from "./helpers";
import { defaultHeaders } from "@/lib/utils";
import { cookies } from "next/headers";

export async function signIn(data: z.infer<typeof LoginSchema>) {
  try {
    const res = await fetch(`${API_URL}/admins/login`, {
      method: "POST",
      body: JSON.stringify(data)
    });

    const response: APIResponse<{ token: string }, any> = await res.json();
    if (response.data?.token) {
      (await cookies()).set("token", response?.data.token, {
        expires: TOKEN_EXPIRATION_DATE
      });
    }

    return response;
  } catch (error) {
    return;
  }
}

export async function getAdmin(): Promise<Admin | null> {
  const token = await getAuthorizationToken();

  try {
    const response = await fetch(`${API_URL}/admins/get`, {
      headers: defaultHeaders({
        Authorization: `Bearer ${token}`
      })
    });

    const data: APIResponse<{ admin: Admin }, null> = await response.json();

    if (!data?.data?.admin?.id) return null;

    return data?.data?.admin;
  } catch (error) {
    console.log({ error });
    return null;
  }
}
