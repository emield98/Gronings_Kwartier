"use client"

import { useMemo } from "react"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { useSaleClock } from "@/hooks/use-sale-clock"
import { siteConfig } from "@/config/site"
import Countdown from "@/components/countdown"
import { Event, getStampDate, getLongDate, getEventStart, getEventStatus } from "@/lib/events"

interface HeroSectionProps {
  event?: Event
  scrollToSection: (sectionId: string) => void
}

export default function HeroSection({ event, scrollToSection }: HeroSectionProps) {
  const { language, t } = useLanguage()

  const clockedEvents = useMemo(() => (event ? [event] : []), [event])
  const now = useSaleClock(clockedEvents)
  const status = event ? getEventStatus(event, now) : null

  const ctaLabel = !status
    ? t("hero.cta.comingSoon")
    : status === "tickets-available"
      ? t("hero.cta")
      : status === "sold-out"
        ? t("hero.cta.soldOut")
        : t("hero.cta.comingSoon")

  return (
    <section id="home" className="gk-grain gk-screen relative flex flex-col overflow-hidden">
      {/* Treated background plate. No poster: the footage fades up out of
          black rather than flashing a still first. */}
      <div className="absolute inset-0 z-0 bg-gk-ink">
        <video
          className="h-full w-full object-cover"
          style={{ filter: "grayscale(1) contrast(1.25) brightness(0.72)" }}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/header.mp4" type="video/mp4" />
        </video>
        {/* Duotone wash — orange pushed through the desaturated footage */}
        <div className="absolute inset-0 bg-gk-oranje/25 mix-blend-color" />
        <div className="absolute inset-0 bg-gradient-to-t from-gk-ink via-gk-ink/55 to-gk-ink/75" />
        <div aria-hidden="true" className="gk-vignette absolute inset-0" />
        <div aria-hidden="true" className="gk-scanlines absolute inset-0 opacity-30" />
      </div>

      {/* Wordmark block fills whatever the counter leaves */}
      <div className="relative z-10 flex flex-1 flex-col justify-end px-6 pb-10 pt-32 sm:pb-14">
        <div className="mx-auto w-full max-w-7xl">
          <div className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700">
            <span className="gk-plate">
              {event ? t("hero.edition", { edition: event.edition }) : siteConfig.name}
            </span>
          </div>

          {/* Wordmark + date stamp */}
          <div className="mt-5 flex flex-wrap items-end gap-x-6 gap-y-4">
            <h1 className="gk-display animate-in fade-in slide-in-from-bottom-6 fill-mode-both text-[clamp(3.5rem,22vw,13rem)] text-gk-kalk duration-700 [animation-delay:120ms]">
              Gronings
              <br />
              Kwartier
            </h1>

            {event && (
              <div className="animate-in fade-in slide-in-from-bottom-6 fill-mode-both mb-2 duration-700 [animation-delay:260ms]">
                <span className="gk-tnum inline-block bg-gk-oranje px-3 py-1.5 font-mono text-base font-bold tracking-tight text-gk-ink sm:px-4 sm:py-2 sm:text-2xl">
                  {getStampDate(event)}
                </span>
              </div>
            )}
          </div>

          {/* Call to action */}
          <div className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 duration-700 [animation-delay:400ms] sm:mt-10">
            <button
              onClick={() => scrollToSection("tickets")}
              className="group inline-flex items-center gap-3 bg-gk-oranje px-6 py-3.5 font-mono text-[0.7rem] font-bold uppercase tracking-plate text-gk-ink transition-colors hover:bg-gk-kalk sm:px-7 sm:py-4 sm:text-xs"
            >
              {ctaLabel}
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </button>

            {event && (
              <p className="font-mono text-[0.7rem] uppercase tracking-plate text-gk-rook sm:text-xs">
                {getLongDate(event, language)}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* The counter is part of the hero, not the page below it */}
      {event && (
        <div className="animate-in fade-in fill-mode-both relative z-10 duration-700 [animation-delay:560ms]">
          <Countdown target={getEventStart(event).toISOString()} />
        </div>
      )}
    </section>
  )
}
