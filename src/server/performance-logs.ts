"use server";

import db from "@/lib/prisma";

import { EmployeeSchema, PerformanceLogSchema } from "@/lib/schema";
import { Prisma } from "@prisma/client";

import { actionResponse } from "@/lib/api";
import { revalidatePath } from "next/cache";
import { adminRoutes } from "@/app/admin/(authorized)/_helpers/routes";
import { z } from "zod";

export async function getPerformanceLogs() {
  try {
    return await db.performanceLog.findMany({
      orderBy: { id: "desc" }
    });
  } catch (error) {
    return [];
  }
}

export async function createPerformanceLogAction(
  employeeId: number,
  data: z.infer<typeof PerformanceLogSchema.Create>
) {
  try {
    await db.performanceLog.create({
      data: {
        ...data,
        employeeId
      }
    });
    revalidatePath(adminRoutes.performanceLogs.root);
    return actionResponse(200, "Performance log created successfully");
  } catch (error) {
    return actionResponse(500, "Failed to create performance log try again later.");
  }
}

export async function updatePerformanceLogAction(
  id: number,
  data: z.infer<typeof PerformanceLogSchema.Update>
) {
  try {
    await db.performanceLog.update({
      where: { id },
      data: data
    });
    revalidatePath(adminRoutes.performanceLogs.root);
    return actionResponse(200, "Performance log updated successfully");
  } catch (error) {
    return actionResponse(500, "Failed to update performance log try again later.");
  }
}

export async function deletePerformanceLogAction(id: number) {
  try {
    await db.performanceLog.delete({
      where: { id }
    });
    revalidatePath(adminRoutes.performanceLogs.root);
    return actionResponse(200, "Performance log deleted successfully");
  } catch (error) {
    return actionResponse(500, "Failed to delete performance log try again later.");
  }
}
