"use server";

import db from "@/lib/prisma";

import { PartnerSchema } from "@/lib/schema";
import { Partner } from "@prisma/client";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { actionResponse } from "@/lib/api";
import { revalidatePath } from "next/cache";
import { adminRoutes } from "@/app/admin/(authorized)/_helpers/routes";
import { v4 as uuid } from "uuid";
import { storage } from "@/lib/firebase";
import { z } from "zod";

export async function getPartner(id: number) {
  try {
    const partner = await db.partner.findUnique({
      where: { id }
    });
    return partner;
  } catch (error) {
    return null;
  }
}

export async function getPartners(): Promise<Partner[]> {
  try {
    const partners = await db.partner.findMany({
      orderBy: { id: "desc" }
    });

    return partners;
  } catch (error) {
    return [];
  }
}

export async function createPartnerAction(
  data: z.infer<typeof PartnerSchema.Create>,
  image: File | null
) {
  try {
    if (!image) return actionResponse(500, "Please provide an image");
    const storageRef = ref(storage, `blogs/${uuid()}`);
    const uploaded = await uploadBytes(storageRef, image as any);
    const imageUrl = await getDownloadURL(storageRef);

    const newPartner = await db.partner.create({
      data: {
        ...data,
        image: imageUrl
      }
    });

    return actionResponse(201, "Partner has been created.");
  } catch (error) {
    return actionResponse(500, "Something went wrong");
  }
}

export async function updatePartnerAction(
  partnerId: number,
  data: z.infer<typeof PartnerSchema.Update>,
  image: File | null
) {
  try {
    const partner = await db.partner.findUnique({
      where: { id: partnerId }
    });
    let imageURL = partner?.image;

    if (image) {
      const storageRef = ref(storage, `blogs/${uuid()}`);
      const uploaded = await uploadBytes(storageRef, image as any);
      imageURL = await getDownloadURL(storageRef);
    }

    const updated = await db.partner.update({
      where: {
        id: partnerId
      },
      data: {
        ...data,
        image: imageURL
      }
    });

    revalidatePath(adminRoutes.partners.view(partnerId));
    revalidatePath(adminRoutes.partners.update(partnerId));
    return actionResponse(201, `Partner Details has been updated.`);
  } catch (error) {
    return actionResponse(500, "Something went wrong");
  }
}

export async function deletePartnerAction(partnerId: number) {
  try {
    await db.partner.delete({
      where: {
        id: partnerId
      }
    });
    revalidatePath(adminRoutes.partners.root);
    return actionResponse(200, "Partner has been deleted.");
  } catch (error) {
    return actionResponse(500, "Something went wrong");
  }
}
