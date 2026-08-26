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

const CELLS: { key: keyof Remaining; label: TranslationKey }[] = [
  { key: "days", label: "countdown.days" },
  { key: "hours", label: "countdown.hours" },
  { key: "minutes", label: "countdown.minutes" },
  { key: "seconds", label: "countdown.seconds" },
]

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
    <div className="gk-bracket border border-gk-staal bg-gk-beton">
      {/* Gauge header */}
      <div className="flex items-center justify-between gap-4 border-b border-gk-staal px-5 py-3">
        <span className="gk-plate">{t("countdown.title")}</span>
        <span
          aria-hidden="true"
          className="h-2 w-2 shrink-0 rounded-full bg-gk-oranje animate-gk-led"
        />
      </div>

      {isLive ? (
        <p className="px-5 py-8 text-center font-display text-3xl font-black uppercase tracking-tight text-gk-oranje">
          {t("countdown.live")}
        </p>
      ) : (
        <div className="grid grid-cols-4 divide-x divide-gk-staal">
          {CELLS.map(({ key, label }) => (
            <div key={key} className="px-2 py-5 text-center sm:px-4 sm:py-7">
              <div className="relative">
                <span className="gk-tnum block font-display text-[clamp(2.25rem,8vw,4.5rem)] font-black leading-none text-gk-kalk">
                  {remaining
                    ? String(remaining[key]).padStart(2, "0")
                    : "––"}
                </span>
                {/* Split-flap seam */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-gk-ink/70"
                />
              </div>
              <span className="mt-3 block font-mono text-[0.6rem] uppercase tracking-plate text-gk-rook">
                {t(label)}
              </span>
            </div>
          ))}
        </div>
      )}

      <div aria-hidden="true" className="gk-hazard h-1.5 w-full opacity-70" />
    </div>
  )
}
