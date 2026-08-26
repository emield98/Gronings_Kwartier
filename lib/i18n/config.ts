// Supported languages. Gronings ("gos" is the ISO 639-3 code for Gronings) is
// the default; Dutch is the alternative.
export const languages = ["gos", "nl"] as const

export type Language = (typeof languages)[number]

export const defaultLanguage: Language = "gos"

export const languageMeta: Record<Language, { short: string; full: string; htmlLang: string }> = {
  gos: { short: "GRO", full: "Grunnegs", htmlLang: "nds-NL" },
  nl: { short: "NL", full: "Nederlands", htmlLang: "nl" },
}

export const LANGUAGE_STORAGE_KEY = "gk-language"

export function isLanguage(value: unknown): value is Language {
  return typeof value === "string" && (languages as readonly string[]).includes(value)
}
