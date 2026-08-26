"use client"

import { createContext, useCallback, useContext, useEffect, useState } from "react"
import {
  LANGUAGE_STORAGE_KEY,
  defaultLanguage,
  isLanguage,
  languageMeta,
  type Language,
} from "@/lib/i18n/config"
import { translations, type TranslationKey } from "@/lib/i18n/translations"

interface LanguageContextValue {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: TranslationKey, vars?: Record<string, string>) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Always start on the default so server and client render the same markup;
  // a stored preference is applied right after hydration.
  const [language, setLanguageState] = useState<Language>(defaultLanguage)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
      if (isLanguage(stored)) {
        setLanguageState(stored)
      }
    } catch {
      // localStorage can be unavailable (private mode, blocked cookies) — keep the default.
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = languageMeta[language].htmlLang
  }, [language])

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next)
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, next)
    } catch {
      // Preference just won't persist across visits.
    }
  }, [])

  const t = useCallback(
    (key: TranslationKey, vars?: Record<string, string>) => {
      const value = translations[language][key]
      if (!vars) return value
      return Object.entries(vars).reduce(
        (acc, [name, replacement]) => acc.replaceAll(`{${name}}`, replacement),
        value,
      )
    },
    [language],
  )

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
