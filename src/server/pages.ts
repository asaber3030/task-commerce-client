"use server";

import db from "@/lib/prisma";

import { FullPage } from "@/types/app";

export async function getPage(id: number) {
  try {
    const page = await db.page.findUnique({
      where: { id }
    });
    return page;
  } catch (error) {
    return null;
  }
}

export async function getFullPage(key: string) {
  try {
    const page = await db.page.findUnique({
      where: { name: key },
      include: {
        sections: {
          include: {
            translations: true
          }
        }
      }
    });
    return page;
  } catch (error) {
    return null;
  }
}

export async function getFullSection(id: number) {
  try {
    const section = await db.section.findUnique({
      where: {
        id
      },
      include: {
        translations: true
      }
    });
    return section;
  } catch (error) {
    return null;
  }
}

export async function getPages(): Promise<FullPage[]> {
  try {
    const pages = await db.page.findMany({
      include: {
        _count: {
          select: {
            sections: true
          }
        }
      },
      orderBy: { id: "desc" }
    });

    return pages;
  } catch (error) {
    return [];
  }
}

export async function getPageSections(pageId: number) {
  try {
    const sections = await db.section.findMany({
      where: { pageId },
      include: {
        translations: true
      }
    });
    return sections;
  } catch (error) {
    return [];
  }
}
