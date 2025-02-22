"use server";

import db from "@/lib/prisma";

import { SectionTranslationSchema } from "@/lib/schema";
import { SectionListItem } from "@/types/app";

import { actionResponse } from "@/lib/api";
import { z } from "zod";

export async function updateSectionTranslationAction(
  sectionId: number,
  data: z.infer<typeof SectionTranslationSchema>,
  list: SectionListItem[],
  arList: SectionListItem[]
) {
  try {
    const section = await db.section.findUnique({
      where: { id: sectionId },
      include: { translations: true }
    });

    if (!section) return actionResponse(404, "Section not found");

    const arTranslation = db.sectionTranslation.findFirst({
      where: { sectionId, locale: "ar" }
    });

    const enTranslation = db.sectionTranslation.findFirst({
      where: { sectionId, locale: "en" }
    });

    const [ar, en] = await Promise.all([arTranslation, enTranslation]);

    if (!ar) {
      await db.sectionTranslation.create({
        data: {
          sectionId,
          locale: "ar",
          list: arList,
          title: data.ar.title,
          content: data.ar.content
        }
      });
    } else {
      await db.sectionTranslation.updateMany({
        where: {
          locale: "ar",
          sectionId
        },
        data: {
          list: arList,
          title: data.ar.title,
          content: data.ar.content
        }
      });
    }

    if (!en) {
      await db.sectionTranslation.create({
        data: {
          sectionId,
          locale: "en",
          list: list,
          title: data.en.title,
          content: data.en.content
        }
      });
    } else {
      await db.sectionTranslation.updateMany({
        where: {
          locale: "en",
          sectionId
        },
        data: {
          list: list,
          title: data.en.title,
          content: data.en.content
        }
      });
    }

    return actionResponse(200, "Section translation updated");
  } catch (error) {
    return actionResponse(200, "Failed to update Section!");
  }
}
