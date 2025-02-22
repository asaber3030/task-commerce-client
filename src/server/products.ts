"use server";

import db from "@/lib/prisma";

import { ProductSchema } from "@/lib/schema";
import { Product } from "@prisma/client";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { actionResponse } from "@/lib/api";
import { revalidatePath } from "next/cache";
import { adminRoutes } from "@/app/admin/(authorized)/_helpers/routes";
import { v4 as uuid } from "uuid";
import { storage } from "@/lib/firebase";
import { z } from "zod";

export async function getProductsInIds(ids: number[]) {
  return await db.product.findMany({
    where: {
      id: { in: ids }
    },
    take: 10
  });
}

export async function getProduct(id: number) {
  try {
    const product = await db.product.findUnique({
      where: { id }
    });
    return product;
  } catch (error) {
    return null;
  }
}

export async function getProducts(search?: string): Promise<Product[]> {
  try {
    const products = await db.product.findMany({
      orderBy: { id: "desc" }
    });

    return products;
  } catch (error) {
    return [];
  }
}

export async function createProductAction(
  data: z.infer<typeof ProductSchema.Create>,
  image: File | null
) {
  try {
    if (!image) return actionResponse(500, "Please provide an image");
    const storageRef = ref(storage, `blogs/${uuid()}`);
    const uploaded = await uploadBytes(storageRef, image as any);
    const imageUrl = await getDownloadURL(storageRef);

    const newProject = await db.product.create({
      data: {
        ...data,
        image: imageUrl
      }
    });

    return actionResponse(201, "Product has been created.");
  } catch (error) {
    return actionResponse(500, "Something went wrong");
  }
}

export async function updateProductAction(
  productId: number,
  data: z.infer<typeof ProductSchema.Update>,
  image: File | null
) {
  try {
    const project = await db.product.findUnique({
      where: { id: productId }
    });
    let imageURL = project?.image;

    if (image) {
      const storageRef = ref(storage, `blogs/${uuid()}`);
      const uploaded = await uploadBytes(storageRef, image as any);
      imageURL = await getDownloadURL(storageRef);
    }
    const updated = await db.product.update({
      where: {
        id: productId
      },
      data: {
        ...data,
        image: imageURL
      }
    });
    revalidatePath(adminRoutes.products.view(productId));
    revalidatePath(adminRoutes.products.update(productId));
    return actionResponse(201, `Project Details has been updated.`);
  } catch (error) {
    return actionResponse(500, "Something went wrong");
  }
}

export async function deleteProductAction(productId: number) {
  try {
    await db.product.delete({
      where: {
        id: productId
      }
    });
    revalidatePath(adminRoutes.products.root);
    return actionResponse(200, "Project has been deleted.");
  } catch (error) {
    return actionResponse(500, "Something went wrong");
  }
}
