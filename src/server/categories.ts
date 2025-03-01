"use server";

import db from "@/lib/prisma";

import { CategorySchema } from "@/lib/schema";

import { actionResponse } from "@/lib/api";
import { revalidatePath } from "next/cache";
import { adminRoutes } from "@/app/admin/(authorized)/_helpers/routes";
import { z } from "zod";

export async function getCategories() {
  return await db.category.findMany({
    orderBy: { id: "desc" }
  });
}

export async function createCategoryAction(data: z.infer<typeof CategorySchema.Create>) {
  try {
    await db.category.create({
      data
    });
    revalidatePath(adminRoutes.categories.root);
    return actionResponse(200, "Category created successfully");
  } catch (error) {
    return actionResponse(500, "Failed to create Category try again later.");
  }
}

export async function updateCategoryAction(
  id: number,
  data: z.infer<typeof CategorySchema.Update>
) {
  try {
    await db.category.update({
      where: { id },
      data
    });
    revalidatePath(adminRoutes.categories.root);
    return actionResponse(200, "Category updated successfully");
  } catch (error) {
    return actionResponse(500, "Failed to update Category try again later.");
  }
}

export async function deleteCategoryAction(id: number) {
  try {
    await db.category.delete({
      where: { id }
    });
    revalidatePath(adminRoutes.categories.root);
    return actionResponse(200, "Category deleted successfully");
  } catch (error) {
    return actionResponse(500, "Failed to delete try again later.");
  }
}
