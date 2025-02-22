"use server";

import db from "@/lib/prisma";

import { BlogSchema } from "@/lib/schema";
import { Blog } from "@prisma/client";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { actionResponse } from "@/lib/api";
import { revalidatePath } from "next/cache";
import { adminRoutes } from "@/app/admin/(authorized)/_helpers/routes";
import { v4 as uuid } from "uuid";
import { storage } from "@/lib/firebase";
import { z } from "zod";

export async function getBlog(id: number) {
  try {
    const blog = await db.blog.findUnique({
      where: { id }
    });
    return blog;
  } catch (error) {
    return null;
  }
}

export async function getBlogs(): Promise<Blog[]> {
  try {
    const blogs = await db.blog.findMany({
      orderBy: { id: "desc" }
    });

    return blogs;
  } catch (error) {
    return [];
  }
}

export async function createBlogAction(
  data: z.infer<typeof BlogSchema.Create>,
  image: File | null
) {
  try {
    if (!image) return actionResponse(500, "Please provide an image");
    const storageRef = ref(storage, `blogs/${uuid()}`);
    const uploaded = await uploadBytes(storageRef, image as any);
    const imageUrl = await getDownloadURL(storageRef);

    const newBlog = await db.blog.create({
      data: {
        ...data,
        image: imageUrl
      }
    });

    return actionResponse(201, "Blog has been created.");
  } catch (error) {
    return actionResponse(500, "Something went wrong");
  }
}

export async function updateBlogAction(
  blogId: number,
  data: z.infer<typeof BlogSchema.Update>,
  image: File | null
) {
  try {
    const blog = await db.blog.findUnique({
      where: { id: blogId }
    });
    let imageURL = blog?.image;

    if (image) {
      const storageRef = ref(storage, `blogs/${uuid()}`);
      const uploaded = await uploadBytes(storageRef, image as any);
      imageURL = await getDownloadURL(storageRef);
    }

    const updated = await db.blog.update({
      where: {
        id: blogId
      },
      data: {
        ...data,
        image: imageURL
      }
    });

    revalidatePath(adminRoutes.blogs.view(blogId));
    revalidatePath(adminRoutes.blogs.update(blogId));
    return actionResponse(201, `Blog Details has been updated.`);
  } catch (error) {
    return actionResponse(500, "Something went wrong");
  }
}

export async function deleteBlogAction(blogId: number) {
  try {
    await db.blog.delete({
      where: {
        id: blogId
      }
    });
    revalidatePath(adminRoutes.blogs.root);
    return actionResponse(200, "Blog has been deleted.");
  } catch (error) {
    return actionResponse(500, "Something went wrong");
  }
}
