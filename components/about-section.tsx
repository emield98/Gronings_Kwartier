"use client"

import { useLanguage } from "@/components/language-provider"
import Reveal from "@/components/reveal"
import { getLongDate, type Event } from "@/lib/events"

export default function AboutSection({ event }: { event?: Event }) {
  const { language, t } = useLanguage()

  const facts = [
    { label: t("about.data.city"), value: t("about.data.city.value") },
    { label: t("about.data.music"), value: (event?.genres ?? []).join(" · ") || "—" },
    {
      label: t("about.data.next"),
      value: event ? getLongDate(event, language) : "—",
      accent: true,
    },
  ]

  return (
    <section id="about" className="gk-grain relative overflow-hidden bg-gk-ink py-28 md:py-44">
      <div
        aria-hidden="true"
        className="gk-vignette pointer-events-none absolute inset-0 z-[1]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <Reveal>
          <span className="gk-plate">{t("about.plate")}</span>
        </Reveal>

        {/* The statement is the section. Nothing else competes with it. */}
        <h2 className="gk-display mt-10 text-[clamp(3rem,12vw,11rem)] text-gk-kalk">
          <Reveal>
            <span className="block">{t("about.statement.line1")}</span>
          </Reveal>
          <Reveal delay={110}>
            <span className="block pl-[6vw]">{t("about.statement.line2")}</span>
          </Reveal>
          <Reveal delay={220}>
            <span className="block pl-[12vw] text-gk-oranje">
              {t("about.statement.line3")}
            </span>
          </Reveal>
        </h2>

        <Reveal delay={330}>
          <p className="mt-10 font-mono text-xs uppercase tracking-plate text-gk-rook">
            {t("about.sub")}
          </p>
        </Reveal>

        {/* Data plate */}
        <Reveal delay={140}>
          <dl className="mt-20 grid gap-px border border-gk-staal bg-gk-staal sm:grid-cols-3">
            {facts.map((fact) => (
              <div key={fact.label} className="bg-gk-ink px-5 py-5">
                <dt className="font-mono text-[0.6rem] uppercase tracking-plate text-gk-rook">
                  {fact.label}
                </dt>
                <dd
                  className={`mt-2 text-sm font-medium ${
                    fact.accent ? "text-gk-oranje" : "text-gk-kalk"
                  }`}
                >
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
