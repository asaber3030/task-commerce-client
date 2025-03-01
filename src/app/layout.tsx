import "./globals.css";
import { cookies } from "next/headers";

import Footer from "@/components/app/footer";

import type { Metadata } from "next";
import type { Language } from "@/types";
import { Analytics } from "@vercel/analytics/next";

import { InterFont, RubikFont } from "@/lib/fonts";
import { AvailableLanguages, LANGUAGE_COOKIE } from "@/lib/constants";
import { LanguageProvider } from "@/providers/language";
import { ToastContainer } from "react-toastify";

import { ReactQueryClientProvider } from "@/providers/query-client";
import StoreProvider from "@/providers/redux";

export const metadata: Metadata = {
  title: "CoreVine",
  description: "CoreVine"
};

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default async function RootLayout({ children }: Props) {
  const cookieStore = cookies();
  const languageValue = (await cookieStore).get(LANGUAGE_COOKIE)?.value ?? "en";
  const language = !AvailableLanguages.includes(languageValue!)
    ? "en"
    : (languageValue as Language);
  const font = language === "en" ? InterFont.className : RubikFont.className;
  const direction = language === "en" ? "ltr" : "rtl";

  return (
    <html lang={language} dir={direction}>
      <body className={`${font} antialiased`}>
        <StoreProvider>
          <ReactQueryClientProvider>
            <ToastContainer />
            <LanguageProvider language={language}>{children}</LanguageProvider>
          </ReactQueryClientProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
