"use server";

import db from "@/lib/prisma";

import { TaskSchema } from "@/lib/schema";

import { actionResponse } from "@/lib/api";
import { revalidatePath } from "next/cache";
import { adminRoutes } from "@/app/admin/(authorized)/_helpers/routes";
import { z } from "zod";

export async function getTasks() {
  try {
    return await db.task.findMany({
      orderBy: { id: "desc" }
    });
  } catch (error) {
    return [];
  }
}

export async function createTaskAction(
  employeeId: number,
  data: z.infer<typeof TaskSchema.Create>
) {
  try {
    await db.task.create({
      data: {
        ...data,
        assignedTo: employeeId
      }
    });
    revalidatePath(adminRoutes.tasks.root);
    return actionResponse(200, "Task created successfully");
  } catch (error) {
    return actionResponse(500, "Failed to create Task try again later.");
  }
}

export async function updateTaskAction(id: number, data: z.infer<typeof TaskSchema.Update>) {
  try {
    await db.task.update({
      where: { id },
      data: data
    });
    revalidatePath(adminRoutes.tasks.root);
    return actionResponse(200, "Task updated successfully");
  } catch (error) {
    return actionResponse(500, "Failed to update Task try again later.");
  }
}

export async function deleteTaskAction(id: number) {
  try {
    await db.task.delete({
      where: { id }
    });
    revalidatePath(adminRoutes.tasks.root);
    return actionResponse(200, "Task deleted successfully");
  } catch (error) {
    return actionResponse(500, "Failed to delete Task try again later.");
  }
}
