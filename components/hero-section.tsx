"use client"

import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { siteConfig } from "@/config/site"
import { Event, getStampDate, getLongDate } from "@/lib/events"

interface HeroSectionProps {
  event?: Event
  scrollToSection: (sectionId: string) => void
}

export default function HeroSection({ event, scrollToSection }: HeroSectionProps) {
  const { language, t } = useLanguage()

  const ctaLabel = !event
    ? t("hero.cta.comingSoon")
    : event.status === "tickets-available"
      ? t("hero.cta")
      : event.status === "sold-out"
        ? t("hero.cta.soldOut")
        : t("hero.cta.comingSoon")

  return (
    <section
      id="home"
      className="gk-grain relative flex min-h-screen min-h-[100svh] flex-col justify-end overflow-hidden pb-24 pt-32 md:pb-32"
    >
      {/* Treated background plate */}
      <div className="absolute inset-0 z-0">
        <video
          className="h-full w-full object-cover"
          style={{ filter: "grayscale(1) contrast(1.25) brightness(0.72)" }}
          autoPlay
          muted
          loop
          playsInline
          poster="/about.jpg"
        >
          <source src="/header.mp4" type="video/mp4" />
        </video>
        {/* Duotone wash — orange pushed through the desaturated footage */}
        <div className="absolute inset-0 bg-gk-oranje/25 mix-blend-color" />
        <div className="absolute inset-0 bg-gradient-to-t from-gk-ink via-gk-ink/55 to-gk-ink/75" />
        <div aria-hidden="true" className="gk-vignette absolute inset-0" />
        <div aria-hidden="true" className="gk-scanlines absolute inset-0 opacity-30" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        <div className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700">
          <span className="gk-plate">
            {event ? t("hero.edition", { edition: event.edition }) : siteConfig.name}
          </span>
        </div>

        {/* Wordmark + date stamp */}
        <div className="mt-6 flex flex-wrap items-end gap-x-8 gap-y-5">
          <h1 className="gk-display animate-in fade-in slide-in-from-bottom-6 fill-mode-both text-[clamp(3.75rem,16vw,13rem)] text-gk-kalk duration-700 [animation-delay:120ms]">
            Gronings
            <br />
            Kwartier
          </h1>

          {event && (
            <div className="animate-in fade-in slide-in-from-bottom-6 fill-mode-both mb-3 duration-700 [animation-delay:260ms]">
              <span className="gk-tnum inline-block bg-gk-oranje px-4 py-2 font-mono text-lg font-bold tracking-tight text-gk-ink sm:text-2xl">
                {getStampDate(event)}
              </span>
            </div>
          )}
        </div>

        {/* Steel data rule */}
        <dl className="animate-in fade-in fill-mode-both mt-10 grid gap-px border-y border-gk-staal bg-gk-staal duration-700 [animation-delay:400ms] sm:grid-cols-3">
          <div className="bg-gk-ink/70 px-4 py-4 backdrop-blur-sm">
            <dt className="font-mono text-[0.6rem] uppercase tracking-plate text-gk-rook">
              {t("hero.venue")}
            </dt>
            <dd className="mt-1.5 text-sm font-medium text-gk-kalk">
              {event ? `${event.venue} · ${event.address.split(",")[0]}` : "—"}
            </dd>
          </div>
          <div className="bg-gk-ink/70 px-4 py-4 backdrop-blur-sm">
            <dt className="font-mono text-[0.6rem] uppercase tracking-plate text-gk-rook">
              {t("hero.doors")}
            </dt>
            <dd className="gk-tnum mt-1.5 font-mono text-sm font-medium text-gk-kalk">
              {event ? `${event.startTime} – ${event.endTime}` : "—"}
            </dd>
          </div>
          <div className="bg-gk-ink/70 px-4 py-4 backdrop-blur-sm">
            <dt className="font-mono text-[0.6rem] uppercase tracking-plate text-gk-rook">
              {t("events.music")}
            </dt>
            <dd className="mt-1.5 text-sm font-medium text-gk-kalk">
              {event ? event.genres.join(" · ") : "—"}
            </dd>
          </div>
        </dl>

        {/* Call to action */}
        <div className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both mt-10 flex flex-wrap items-center gap-6 duration-700 [animation-delay:540ms]">
          <button
            onClick={() => scrollToSection("tickets")}
            className="group inline-flex items-center gap-3 bg-gk-oranje px-7 py-4 font-mono text-xs font-bold uppercase tracking-plate text-gk-ink transition-colors hover:bg-gk-kalk"
          >
            {ctaLabel}
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>

          {event && (
            <p className="font-mono text-xs uppercase tracking-plate text-gk-rook">
              {getLongDate(event, language)}
            </p>
          )}
        </div>
      </div>

      {/* Scroll indicator — a gauge, not a bouncing arrow */}
      <button
        onClick={() => scrollToSection("about")}
        aria-label={t("hero.scroll")}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="relative block h-12 w-px overflow-hidden bg-gk-staal">
          <span className="absolute inset-x-0 top-0 h-4 animate-gk-led bg-gk-oranje" />
        </span>
      </button>

      <div aria-hidden="true" className="gk-hazard absolute inset-x-0 bottom-0 z-10 h-2" />
    </section>
  )
}
