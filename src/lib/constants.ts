import { ProjectType } from "@prisma/client";

export const AvailableLanguages = ["en", "ar"];
export const LANGUAGE_COOKIE = "language";

export const LOGO_PATH = "/bg.webp";

export const socialMedia = {
  facebook: "https://www.facebook.com/profile.php?id=61566599342393",
  linkedin: "https://www.linkedin.com/company/corevine/",
  instagram: "https://www.instagram.com/corevinetechnology/?utm_source=ig_web_button_share_sheet",
  whatsapp: "https://wa.me/966112215555",
  mobile: "966112215555",
  location: "https://maps.app.goo.gl/P3vX2bB4izu6CTt7A"
};

export const API_URL = process.env.API_URL;
export const LOGIN_URL = `${API_URL}/admins/login`;
export const ADMIN_DATA_URL = `${API_URL}/admins/get`;
export const TOKEN_EXPIRATION_DATE = Date.now() + 24 * 60 * 60 * 1000 * 30;

export const defaultSEO = [
  {
    title: "Corevine",
    description:
      "Corevine is a software development company that provides custom software solutions for businesses.",
    keywords:
      "Corevine, software development, custom software, web development, mobile development",
    ogTitle: "Corevine",
    ogDescription:
      "Corevine is a software development company that provides custom software solutions for businesses.",
    ogType: "website",
    id: 1,
    pageId: 1,
    locale: "en",
    createdAt: new Date("2021-09-29T14:00:00.000Z"),
    updatedAt: new Date("2021-09-29T14:00:00.000Z")
  },
  {
    title: "Corevine",
    description:
      "Corevine is a software development company that provides custom software solutions for businesses.",
    keywords:
      "Corevine, software development, custom software, web development, mobile development",
    ogTitle: "Corevine",
    ogDescription:
      "Corevine is a software development company that provides custom software solutions for businesses.",
    ogType: "website",
    id: 1,
    pageId: 1,
    locale: "ar",
    createdAt: new Date("2021-09-29T14:00:00.000Z"),
    updatedAt: new Date("2021-09-29T14:00:00.000Z")
  }
];
