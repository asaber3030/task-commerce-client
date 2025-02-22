import { LanguageContext } from "@/providers/language"
import { useContext } from "react"

export const useLanguage = () => {
  const language = useContext(LanguageContext)
  return language
}
