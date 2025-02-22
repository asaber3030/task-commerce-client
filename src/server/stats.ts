"use server";

import db from "@/lib/prisma";
import { LoginHistory, PageVisit, ProductSale, ProductSearch, UserActivity } from "@prisma/client";

export async function getUserActivities(): Promise<UserActivity[]> {
  const userActivities = await db.userActivity.findMany({
    orderBy: { createdAt: "desc" }
  });
  return userActivities;
}

export async function getProductSearches(): Promise<ProductSearch[]> {
  const productSearches = await db.productSearch.findMany({
    orderBy: { count: "desc" }
  });

  return productSearches;
}

export async function getProductSales(): Promise<ProductSale[]> {
  const productSale = await db.productSale.findMany();
  return productSale;
}

export async function getPageVisits(): Promise<PageVisit[]> {
  const productSale = await db.pageVisit.findMany();
  return productSale;
}

export type LoginR = {
  userId: number;
  _count: {
    userId: number;
  };
};
export async function getLoginHistory(): Promise<LoginR[]> {
  const loginStats = await db.loginHistory.groupBy({
    by: ["userId"],
    _count: {
      userId: true
    }
  });
  return loginStats;
}
