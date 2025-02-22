"use server";

import db from "@/lib/prisma";

import { EmployeeSchema } from "@/lib/schema";
import { Employee, Prisma } from "@prisma/client";

import { actionResponse } from "@/lib/api";
import { revalidatePath } from "next/cache";
import { adminRoutes } from "@/app/admin/(authorized)/_helpers/routes";
import { z } from "zod";

export async function getEmployees(): Promise<Employee[]> {
  try {
    return await db.employee.findMany({
      orderBy: { id: "desc" }
    });
  } catch (error) {
    return [];
  }
}

export async function findEmployee(input: Prisma.EmployeeWhereUniqueInput) {
  return await db.employee.findUnique({
    where: input
  });
}

export async function createEmployeeAction(data: z.infer<typeof EmployeeSchema.Create>) {
  try {
    await db.employee.create({
      data: {
        ...data,
        role: "Employee"
      }
    });
    revalidatePath(adminRoutes.employees.root);
    return actionResponse(200, "Employee created successfully");
  } catch (error) {
    return actionResponse(500, "Failed to create employee try again later.");
  }
}

export async function updateEmployeeAction(
  id: number,
  data: z.infer<typeof EmployeeSchema.Update>
) {
  try {
    await db.employee.update({
      where: { id },
      data: data
    });
    revalidatePath(adminRoutes.employees.root);
    return actionResponse(200, "Employee updated successfully");
  } catch (error) {
    return actionResponse(500, "Failed to update employee try again later.");
  }
}

export async function deleteEmployeeAction(id: number) {
  try {
    await db.employee.delete({
      where: { id }
    });
    revalidatePath(adminRoutes.employees.root);
    return actionResponse(200, "Employee deleted successfully");
  } catch (error) {
    return actionResponse(500, "Failed to delete employee try again later.");
  }
}
