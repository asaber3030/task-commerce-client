"use server";

import db from "@/lib/prisma";

import { ReviewSchema } from "@/lib/schema";
import { Review } from "@prisma/client";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { actionResponse } from "@/lib/api";
import { revalidatePath } from "next/cache";
import { adminRoutes } from "@/app/admin/(authorized)/_helpers/routes";
import { v4 as uuid } from "uuid";
import { storage } from "@/lib/firebase";
import { z } from "zod";

export async function getReview(id: number) {
  try {
    const review = await db.review.findUnique({
      where: { id }
    });
    return review;
  } catch (error) {
    return null;
  }
}

export async function getReviews(): Promise<Review[]> {
  try {
    const reviews = await db.review.findMany({
      orderBy: { id: "desc" }
    });

    return reviews;
  } catch (error) {
    return [];
  }
}

export async function createReviewAction(
  data: z.infer<typeof ReviewSchema.Create>,
  image: File | null
) {
  try {
    if (!image) return actionResponse(500, "Please provide an image");
    const storageRef = ref(storage, `blogs/${uuid()}`);
    const uploaded = await uploadBytes(storageRef, image as any);
    const imageUrl = await getDownloadURL(storageRef);

    const newreview = await db.review.create({
      data: {
        ...data,
        image: imageUrl
      }
    });

    return actionResponse(201, "Review has been created.");
  } catch (error) {
    return actionResponse(500, "Something went wrong");
  }
}

export async function updateReviewAction(
  reviewId: number,
  data: z.infer<typeof ReviewSchema.Update>,
  image: File | null
) {
  try {
    const review = await db.review.findUnique({
      where: { id: reviewId }
    });
    let imageURL = review?.image;

    if (image) {
      const storageRef = ref(storage, `blogs/${uuid()}`);
      const uploaded = await uploadBytes(storageRef, image as any);
      imageURL = await getDownloadURL(storageRef);
    }
    const updated = await db.review.update({
      where: {
        id: reviewId
      },
      data: {
        ...data,
        image: imageURL
      }
    });
    revalidatePath(adminRoutes.reviews.view(reviewId));
    revalidatePath(adminRoutes.reviews.update(reviewId));
    return actionResponse(201, `Review Details has been updated.`);
  } catch (error) {
    return actionResponse(500, "Something went wrong");
  }
}

export async function deleteReviewAction(reviewId: number) {
  try {
    await db.review.delete({
      where: {
        id: reviewId
      }
    });
    revalidatePath(adminRoutes.reviews.root);
    return actionResponse(200, "Review has been deleted.");
  } catch (error) {
    return actionResponse(500, "Something went wrong");
  }
}
