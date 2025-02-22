"use server";

import db from "@/lib/prisma";

import { SettingsSchema } from "@/lib/schema";

import { actionResponse } from "@/lib/api";
import { z } from "zod";

export async function getSettings() {
  return await db.settings.findMany();
}

export async function findSpecificSettings(locale: string, key: string) {
  return await db.settings.findFirst({
    where: { locale, key }
  });
}

export async function updateAppSettingsAction(data: z.infer<typeof SettingsSchema.app>) {
  try {
    const updateName = db.settings.updateMany({
      where: { key: "app.name" },
      data: { value: data.name }
    });
    const updateLocale = db.settings.updateMany({
      where: { key: "app.default-locale" },
      data: { value: data.defaultLocale }
    });
    await Promise.all([updateLocale, updateName]);

    return actionResponse(200, "Updated");
  } catch (error) {
    return actionResponse(200, "Failed to update");
  }
}

export async function updateSocialSettingsAction(data: z.infer<typeof SettingsSchema.social>) {
  try {
    const updateFb = db.settings.updateMany({
      where: { key: "social.facebook" },
      data: { value: data.facebook }
    });
    const updateLinkedIn = db.settings.updateMany({
      where: { key: "social.linkedin" },
      data: { value: data.linkedin }
    });
    const updateInsta = db.settings.updateMany({
      where: { key: "social.instagram" },
      data: { value: data.instagram }
    });
    const updateWhatsapp = db.settings.updateMany({
      where: { key: "social.whatsapp" },
      data: { value: data.whatsapp }
    });

    await Promise.all([updateFb, updateLinkedIn, updateInsta, updateWhatsapp]);

    return actionResponse(200, "Updated");
  } catch (error) {
    return actionResponse(200, "Failed to update");
  }
}

export async function updateContactSettingsAction(data: z.infer<typeof SettingsSchema.contact>) {
  try {
    const updateMobile = db.settings.updateMany({
      where: { key: "contact.mobile" },
      data: { value: data.mobile }
    });
    const updateLocation = db.settings.updateMany({
      where: { key: "contact.location" },
      data: { value: data.location }
    });
    const updateEmail = db.settings.updateMany({
      where: { key: "contact.email" },
      data: { value: data.email }
    });

    await Promise.all([updateMobile, updateLocation, updateEmail]);

    return actionResponse(200, "Updated");
  } catch (error) {
    return actionResponse(200, "Failed to update");
  }
}

export async function updateFooterSettingsAction(data: z.infer<typeof SettingsSchema.footer>) {
  try {
    const updateEnAddress = db.settings.updateMany({
      where: { key: "footer.address", locale: "en" },
      data: { value: data.en.address }
    });

    const updateEnDescription = db.settings.updateMany({
      where: { key: "footer.description", locale: "en" },
      data: { value: data.en.description }
    });

    const updateArAddress = db.settings.updateMany({
      where: { key: "footer.address", locale: "ar" },
      data: { value: data.ar.address }
    });

    const updateArDescription = db.settings.updateMany({
      where: { key: "footer.description", locale: "ar" },
      data: { value: data.ar.description }
    });

    const updatePhone = db.settings.updateMany({
      where: { key: "footer.phone" },
      data: { value: data.phone }
    });

    const updateEmail = db.settings.updateMany({
      where: { key: "footer.email" },
      data: { value: data.email }
    });

    await Promise.all([
      updateEnAddress,
      updateEnDescription,
      updateArAddress,
      updateArDescription,
      updatePhone,
      updateEmail
    ]);

    return actionResponse(200, "Updated");
  } catch (error) {
    return actionResponse(200, "Failed to update");
  }
}
