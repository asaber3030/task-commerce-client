"use server";

import bcrypt from "bcrypt";
import db from "@/lib/prisma";

import { AdminSchema } from "@/lib/schema";
import { Prisma } from "@prisma/client";

import { actionResponse } from "@/lib/api";
import { revalidatePath } from "next/cache";
import { adminRoutes } from "@/app/admin/(authorized)/_helpers/routes";
import { getAdmin } from "./auth";
import { z } from "zod";

export async function findAdmin(input: Prisma.AdminWhereUniqueInput) {
  return await db.admin.findUnique({
    where: input
  });
}

export async function getAdmins() {
  const user = await getAdmin();
  return await db.admin.findMany({
    orderBy: { id: "desc" },
    where: {
      id: { not: user?.id }
    }
  });
}

export async function createAdminAction(data: z.infer<typeof AdminSchema.Create>) {
  try {
    await db.admin.create({
      data: {
        ...data,
        password: bcrypt.hashSync(data.password, 10)
      }
    });
    revalidatePath(adminRoutes.admins.root);
    return actionResponse(200, "Admin created successfully");
  } catch (error) {
    return actionResponse(500, "Failed to create admin try again later.");
  }
}

export async function updateAdminAction(id: number, data: z.infer<typeof AdminSchema.Update>) {
  try {
    await db.admin.update({
      where: { id },
      data
    });
    revalidatePath(adminRoutes.admins.root);
    return actionResponse(200, "Admin deleted successfully");
  } catch (error) {
    return actionResponse(500, "Failed to delete try again later.");
  }
}

export async function deleteAdminAction(id: number) {
  try {
    await db.admin.delete({
      where: { id }
    });
    revalidatePath(adminRoutes.admins.root);
    return actionResponse(200, "Admin deleted successfully");
  } catch (error) {
    return actionResponse(500, "Failed to delete try again later.");
  }
}
