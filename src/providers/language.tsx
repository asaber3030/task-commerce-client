"use client"

import { Language } from "@/types"
import React from "react"

export const LanguageContext = React.createContext<Language>("en")

type Props = {
  language: Language
  children: React.ReactNode
}

export const LanguageProvider = ({ language, children }: Props) => {
  return <LanguageContext.Provider value={language}>{children}</LanguageContext.Provider>
}
