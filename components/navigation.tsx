"use client"

import { useState, useEffect } from "react"
import { Menu, X, Instagram } from "lucide-react"
import { siteConfig } from "@/config/site"
import { useLanguage } from "@/components/language-provider"
import LanguageSwitcher from "@/components/language-switcher"
import { cn } from "@/lib/utils"

interface NavigationProps {
  activeSection: string
  scrollToSection: (sectionId: string) => void
}

export default function Navigation({ activeSection, scrollToSection }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [progress, setProgress] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const { t } = useLanguage()

  const handleScrollToSection = (sectionId: string) => {
    scrollToSection(sectionId)
    setIsMenuOpen(false)
  }

  // Thin orange gauge across the top edge, tracking read progress.
  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      setProgress(scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0)
      setScrolled(window.scrollY > 24)
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMenuOpen])

  // Close the overlay on Escape.
  useEffect(() => {
    if (!isMenuOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [isMenuOpen])

  return (
    <>
      <nav
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
          scrolled
            ? "border-b border-gk-staal bg-gk-ink/95 backdrop-blur-md"
            : "border-b border-transparent bg-gradient-to-b from-gk-ink/80 to-transparent",
        )}
      >
        {/* Scroll gauge */}
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[2px] bg-gk-staal/60">
          <div
            className="h-full bg-gk-oranje transition-[width] duration-150 ease-out"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
          <a href="/" aria-label={t("nav.home.aria")} className="shrink-0">
            <img
              src="/logo.png"
              alt="Gronings Kwartier"
              className="h-14 w-auto object-contain md:h-16"
            />
          </a>

          {/* Desktop */}
          <div className="hidden items-center gap-8 md:flex">
            <div className="flex items-center gap-7">
              {siteConfig.navigation.map((section) => {
                const isActive = activeSection === section
                return (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative py-1 font-mono text-[0.7rem] uppercase tracking-plate transition-colors",
                      isActive ? "text-gk-kalk" : "text-gk-rook hover:text-gk-kalk",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute -top-1 left-0 h-[2px] bg-gk-oranje transition-all duration-300",
                        isActive ? "w-full" : "w-0",
                      )}
                    />
                    {t(`nav.${section}`)}
                  </button>
                )
              })}
            </div>

            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              <a
                href={siteConfig.links.instagram}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={t("nav.instagram")}
                className="flex h-8 w-8 items-center justify-center border border-gk-staal text-gk-rook transition-colors hover:border-gk-oranje hover:text-gk-oranje"
              >
                <Instagram size={16} />
              </a>
            </div>
          </div>

          {/* Mobile trigger. It only ever opens: the overlay carries its own
              close control, so this one hides underneath rather than doubling up. */}
          <button
            className={cn(
              "flex h-10 w-10 items-center justify-center border border-gk-staal text-gk-kalk transition-colors hover:border-gk-oranje md:hidden",
              isMenuOpen && "invisible",
            )}
            aria-label={t("nav.openMenu")}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu size={20} />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[55] flex flex-col bg-gk-ink md:hidden">
          <div aria-hidden="true" className="gk-hazard h-2 w-full shrink-0" />

          {/* Control bar: language on the left, close on the right. Same
              padding as the nav bar, so the X lands where the burger was. */}
          <div className="flex shrink-0 items-center justify-between gap-4 px-6 py-4">
            <LanguageSwitcher />
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              aria-label={t("nav.closeMenu")}
              className="flex h-10 w-10 items-center justify-center border border-gk-staal text-gk-kalk transition-colors hover:border-gk-oranje hover:text-gk-oranje"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex flex-1 flex-col justify-between gap-10 overflow-y-auto px-6 pb-10 pt-8">
            <nav className="flex flex-col">
              {siteConfig.navigation.map((section, index) => {
                const isActive = activeSection === section
                return (
                  <button
                    key={section}
                    onClick={() => handleScrollToSection(section)}
                    style={{ animationDelay: `${index * 60}ms` }}
                    className={cn(
                      "group flex items-baseline gap-4 border-b border-gk-staal py-5 text-left",
                      "animate-in fade-in slide-in-from-bottom-3 fill-mode-both duration-500",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "h-2 w-2 shrink-0 translate-y-[-0.15em] transition-colors",
                        isActive ? "bg-gk-oranje" : "bg-gk-staal",
                      )}
                    />
                    <span
                      className={cn(
                        "gk-display text-4xl transition-colors",
                        isActive ? "text-gk-oranje" : "text-gk-kalk",
                      )}
                    >
                      {t(`nav.${section}`)}
                    </span>
                  </button>
                )
              })}
            </nav>

            <div className="flex items-center gap-4">
              <a
                href={siteConfig.links.instagram}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={t("nav.instagram")}
                onClick={() => setIsMenuOpen(false)}
                className="flex h-12 w-12 items-center justify-center border border-gk-staal text-gk-kalk transition-colors hover:border-gk-oranje hover:text-gk-oranje"
              >
                <Instagram size={22} />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
