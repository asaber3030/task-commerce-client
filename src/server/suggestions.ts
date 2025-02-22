"use server";

import db from "@/lib/prisma";

import { SuggestionSchema } from "@/lib/schema";

import { actionResponse } from "@/lib/api";
import { revalidatePath } from "next/cache";
import { adminRoutes } from "@/app/admin/(authorized)/_helpers/routes";
import { z } from "zod";

export async function getSuggestions() {
  return await db.suggestion.findMany({
    orderBy: { id: "desc" }
  });
}

export async function createSuggestionAction(data: z.infer<typeof SuggestionSchema.Create>) {
  try {
    await db.suggestion.create({
      data
    });
    revalidatePath(adminRoutes.suggestions.root);
    return actionResponse(200, "suggestion created successfully");
  } catch (error) {
    return actionResponse(500, "Failed to create suggestion try again later.");
  }
}

export async function updateSuggestionAction(
  id: number,
  data: z.infer<typeof SuggestionSchema.Update>
) {
  try {
    await db.suggestion.update({
      where: { id },
      data
    });
    revalidatePath(adminRoutes.suggestions.root);
    return actionResponse(200, "suggestion deleted successfully");
  } catch (error) {
    return actionResponse(500, "Failed to delete try again later.");
  }
}

export async function deleteSuggestionAction(id: number) {
  try {
    await db.suggestion.delete({
      where: { id }
    });
    revalidatePath(adminRoutes.suggestions.root);
    return actionResponse(200, "suggestion deleted successfully");
  } catch (error) {
    return actionResponse(500, "Failed to delete try again later.");
  }
}
