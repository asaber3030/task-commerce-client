export const AvailableLanguages = ["en", "ar"];
export const LANGUAGE_COOKIE = "language";
export const LOGO_PATH = "/bg.webp";

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
