"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/components/language-provider"
import type { TranslationKey } from "@/lib/i18n/translations"

interface CountdownProps {
  /** ISO datetime of the moment the doors open. */
  target: string
}

interface Remaining {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function remainingUntil(target: number): Remaining | null {
  const diff = target - Date.now()
  if (diff <= 0) return null

  const totalSeconds = Math.floor(diff / 1000)
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor(totalSeconds / 3600) % 24,
    minutes: Math.floor(totalSeconds / 60) % 60,
    seconds: totalSeconds % 60,
  }
}

// Four columns on a 360px phone leave ~54px per label, which the full words
// overflow. Phones get the abbreviation, everything from sm: up the word.
const CELLS: { key: keyof Remaining; label: TranslationKey; short: TranslationKey }[] = [
  { key: "days", label: "countdown.days", short: "countdown.days.short" },
  { key: "hours", label: "countdown.hours", short: "countdown.hours.short" },
  { key: "minutes", label: "countdown.minutes", short: "countdown.minutes.short" },
  { key: "seconds", label: "countdown.seconds", short: "countdown.seconds.short" },
]

/**
 * A readout bolted along the base of the hero, so the wordmark and the
 * counter read as one screen.
 */
export default function Countdown({ target }: CountdownProps) {
  const { t } = useLanguage()
  // Rendered blank on the server so the markup matches on hydration.
  const [remaining, setRemaining] = useState<Remaining | null>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const targetMs = new Date(target).getTime()
    if (Number.isNaN(targetMs)) return

    const tick = () => setRemaining(remainingUntil(targetMs))
    tick()
    setStarted(true)

    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [target])

  const isLive = started && remaining === null

  return (
    <div className="border-t border-gk-staal bg-gk-ink/85 backdrop-blur-md">
      <div aria-hidden="true" className="gk-hazard h-1.5 w-full opacity-80" />

      <div className="mx-auto max-w-7xl px-6">
        {isLive ? (
          <p className="py-5 text-center font-display text-2xl font-black uppercase leading-none tracking-tight text-gk-oranje sm:text-3xl">
            {t("countdown.live")}
          </p>
        ) : (
          <div className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-10 sm:py-5">
            <span className="gk-plate shrink-0">
              {t("countdown.title")}
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 shrink-0 animate-gk-led bg-gk-oranje"
              />
            </span>

            <div className="flex flex-1 items-stretch divide-x divide-gk-staal sm:flex-none">
              {CELLS.map(({ key, label, short }) => (
                <div key={key} className="flex-1 px-2 text-center sm:min-w-[5.5rem] sm:px-5">
                  <div className="relative">
                    <span className="gk-tnum block font-display text-[2rem] font-black leading-none text-gk-kalk sm:text-[2.75rem]">
                      {remaining ? String(remaining[key]).padStart(2, "0") : "––"}
                    </span>
                    {/* Split-flap seam */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-gk-ink/70"
                    />
                  </div>
                  <span className="mt-1.5 block font-mono text-[0.55rem] uppercase tracking-plate text-gk-rook sm:text-[0.6rem]">
                    <span className="sm:hidden">{t(short)}</span>
                    <span className="hidden sm:inline">{t(label)}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
