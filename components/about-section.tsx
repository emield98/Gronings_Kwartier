"use client"

import { useLanguage } from "@/components/language-provider"
import Reveal from "@/components/reveal"

export default function AboutSection() {
  const { t } = useLanguage()

  return (
    <section id="about" className="gk-grain relative overflow-hidden bg-gk-ink py-32 md:py-48">
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
      </div>
    </section>
  )
}
