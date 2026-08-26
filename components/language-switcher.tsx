"use client"

import { languageMeta, languages } from "@/lib/i18n/config"
import { useLanguage } from "@/components/language-provider"
import { languageFlags } from "@/components/flags"
import { cn } from "@/lib/utils"

interface LanguageSwitcherProps {
  size?: "sm" | "lg"
  className?: string
}

export default function LanguageSwitcher({ size = "sm", className }: LanguageSwitcherProps) {
  const { language, setLanguage, t } = useLanguage()

  return (
    <div
      role="group"
      aria-label={t("language.label")}
      className={cn("flex items-stretch border border-gk-staal", className)}
    >
      {languages.map((code) => {
        const Flag = languageFlags[code]
        const isActive = code === language
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLanguage(code)}
            aria-pressed={isActive}
            aria-label={`${t("language.switchTo")} ${languageMeta[code].full}`}
            title={languageMeta[code].full}
            className={cn(
              "group relative transition-colors",
              size === "sm" ? "px-2.5 py-2" : "px-4 py-3",
              isActive ? "bg-gk-staal/50" : "hover:bg-gk-staal/30",
            )}
          >
            <Flag
              aria-hidden="true"
              className={cn(
                "block h-auto transition-all duration-200",
                size === "sm" ? "w-6" : "w-9",
                isActive ? "opacity-100" : "opacity-45 grayscale group-hover:opacity-100",
              )}
            />
            {/* Signal bar marks the active language */}
            <span
              aria-hidden="true"
              className={cn(
                "absolute inset-x-0 bottom-0 h-[2px] transition-colors",
                isActive ? "bg-gk-oranje" : "bg-transparent",
              )}
            />
          </button>
        )
      })}
    </div>
  )
}
