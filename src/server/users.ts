"use server";

import bcrypt from "bcrypt";
import db from "@/lib/prisma";

import { LoginSchema, UserSchema } from "@/lib/schema";
import { OrderStatus, Prisma, User } from "@prisma/client";

import { actionResponse, responseCodes } from "@/lib/api";
import { revalidatePath } from "next/cache";
import { adminRoutes } from "@/app/admin/(authorized)/_helpers/routes";
import { z } from "zod";
import { API_URL, TOKEN_EXPIRATION_DATE } from "@/lib/constants";
import { APIResponse, CartItem } from "@/types";
import { cookies } from "next/headers";
import { getAuthorizationToken, getUserAuthorizationToken } from "./helpers";
import { defaultHeaders } from "@/lib/utils";
import { redirect } from "next/navigation";
import { routes } from "@/lib/routes";
import moment from "moment";

export async function findUser(input: Prisma.UserWhereUniqueInput) {
  return await db.user.findUnique({
    where: input
  });
}

export async function getUsers() {
  return await db.user.findMany({
    orderBy: { id: "desc" }
  });
}

export async function createUserAction(data: z.infer<typeof UserSchema.Create>) {
  try {
    await db.user.create({
      data: {
        ...data,
        password: bcrypt.hashSync(data.password, 10)
      }
    });
    revalidatePath(adminRoutes.users.root);
    return actionResponse(200, "User created successfully");
  } catch (error) {
    return actionResponse(500, "Failed to create User try again later.");
  }
}

export async function updateUserAction(id: number, data: z.infer<typeof UserSchema.Update>) {
  try {
    await db.user.update({
      where: { id },
      data
    });
    revalidatePath(adminRoutes.users.root);
    return actionResponse(200, "User updated successfully");
  } catch (error) {
    return actionResponse(500, "Failed to updated= try again later.");
  }
}

export async function deleteUserAction(id: number) {
  try {
    await db.user.delete({
      where: { id }
    });
    revalidatePath(adminRoutes.users.root);
    return actionResponse(200, "User deleted successfully");
  } catch (error) {
    return actionResponse(500, "Failed to delete try again later.");
  }
}

export async function userSignIn(data: z.infer<typeof LoginSchema>) {
  try {
    const res = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      body: JSON.stringify(data)
    });

    const response: APIResponse<{ token: string }, any> = await res.json();
    if (response.data?.token) {
      (await cookies()).set("user-token", response?.data.token, {
        expires: TOKEN_EXPIRATION_DATE
      });
    }

    return response;
  } catch (error) {
    return;
  }
}

export async function getUser(): Promise<User | null> {
  const token = await getUserAuthorizationToken();

  try {
    const response = await fetch(`${API_URL}/users/get`, {
      headers: defaultHeaders({
        Authorization: `Bearer ${token}`
      })
    });

    const data: APIResponse<{ user: User }, null> = await response.json();

    if (!data?.data?.user?.id) return null;
    return data?.data?.user;
  } catch (error) {
    console.log({ error });
    return null;
  }
}

export async function getCurrentOrder() {
  const user = await getUser();
  if (!user) return redirect(routes.login);

  const currentOrder = await db.order.findFirst({
    where: {
      userId: user.id,
      status: OrderStatus.JustOrdered
    },
    include: {
      user: true,
      items: {
        include: {
          product: true
        }
      }
    }
  });

  return currentOrder;
}

export async function getOrders() {
  const user = await getUser();
  if (!user) return redirect(routes.login);

  const orders = await db.order.findMany({
    where: { userId: user.id },
    orderBy: { id: "desc" },
    include: {
      items: true
    }
  });
  return orders;
}

export async function countOrders() {
  const user = await getUser();
  if (!user) return redirect(routes.login);
  const countOrders = await db.order.count({ where: { userId: user.id } });
  return countOrders;
}

export async function getOrder(id: number) {
  const order = await db.order.findUnique({
    where: { id },
    include: {
      _count: { select: { items: true } },
      user: true,
      items: {
        include: { product: true }
      }
    }
  });
  return order;
}

export async function cancelOrderAction(orderId: number) {
  const order = await db.order.findUnique({ where: { id: orderId } });
  if (!order) return actionResponse(responseCodes.badRequest, "Couldn't find the order");
  if (order.statusNumber > 2) {
    return actionResponse(responseCodes.badRequest, "Can't cancel the order.");
  }
  await db.order.delete({ where: { id: order.id } });
  revalidatePath(routes.profile("orders"));
  return actionResponse(responseCodes.ok, "Order has been cancelled.");
}

export async function createOrder(cart: CartItem[], deliveryValue: number = 20) {
  type TypeRe = { clearAll: boolean };

  const user = await getUser();
  if (!user) return redirect(routes.login);

  let discountValuePercentage = 0;

  let subTotal = 0;

  const subTotalArray = cart.map((item) => (subTotal += item.totalPrice));
  const discountValue = subTotal * discountValuePercentage;
  const total = subTotal - discountValue + deliveryValue;

  const hasCurrentOrder = await getCurrentOrder();
  if (hasCurrentOrder)
    return actionResponse<TypeRe>(responseCodes.badRequest, "Cannot order twice at a time.");

  const newOrder = await db.order.create({
    data: {
      userId: user.id,
      paymentMethod: "Cash",
      discountValue,
      deliveryValue,
      subTotal,
      total,
      orderedAt: new Date(moment.now())
    }
  });

  cart.forEach(async (item) => {
    const newItem = await db.orderItem.create({
      data: {
        orderId: newOrder.id,
        productId: item.id,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalPrice: item.totalPrice
      }
    });
  });

  revalidatePath(routes.profile("orders"));
  return actionResponse<TypeRe>(responseCodes.created, "Order has been placed successfully!", {
    clearAll: true
  });
}
