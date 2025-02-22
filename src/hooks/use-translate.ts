import { useContext } from "react";

import { LanguageContext } from "@/providers/language";
import translate from "@/lib/translate";

export function useTranslate() {
  const language = useContext(LanguageContext);
  return (key: string) => translate(key, language);
}

export function useLanguage() {
  const language = useContext(LanguageContext);
  return language;
}
