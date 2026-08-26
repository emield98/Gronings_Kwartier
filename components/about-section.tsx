"use client"

import { useLanguage } from "@/components/language-provider"
import Reveal from "@/components/reveal"
import MartiniClock from "@/components/martini-clock"

export default function AboutSection() {
  const { t } = useLanguage()

  return (
    <section id="about" className="gk-grain relative overflow-hidden bg-gk-ink pb-32 md:pb-44">
      {/* The hero bottoms out in ink and this band picks the tone straight
          back up, so the seam under the counter reads as a fold rather than
          the start of a different page. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-48 bg-gradient-to-b from-gk-beton/70 via-gk-beton/25 to-transparent"
      />
      <div
        aria-hidden="true"
        className="gk-vignette pointer-events-none absolute inset-0 z-[1]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-20 md:pt-28">
        {/* The statement is the section. Set close to the wordmark's scale so
            it reads as the hero's next line, and each line rises out from
            behind its own baseline. */}
        <h2 className="gk-display text-[clamp(2.5rem,12.5vw,11.5rem)] text-gk-kalk">
          <Reveal variant="mask">
            <span className="block">{t("about.statement.line1")}</span>
          </Reveal>

          {/* The mark nests into the step the staircase opens up: line one
              closes above it, line two runs along its right flank, line three
              passes underneath. It is sized in em, so it holds that nest at
              every width — on a phone it simply shrinks with the type. */}
          <div className="flex items-end gap-[0.28em]">
            <Reveal delay={90} className="shrink-0">
              <img src="/logo.png" alt="" aria-hidden="true" className="gk-mark block" />
            </Reveal>
            <Reveal variant="mask" delay={150} className="min-w-0 flex-1">
              <span className="block">{t("about.statement.line2")}</span>
            </Reveal>
          </div>

          <Reveal variant="mask" delay={280}>
            <span className="gk-flicker block pl-[10%] text-gk-oranje">
              {t("about.statement.line3")}
            </span>
          </Reveal>
        </h2>

        {/* The tower fills the room the staircase leaves open on the right,
            and answers the statement: the quarter runs out, the night does
            not. It wraps onto its own line when the column gets narrow. */}
        <div className="mt-10 flex flex-wrap items-end gap-x-10 gap-y-8">
          <Reveal delay={420}>
            <p className="pl-[10%] font-mono text-xs uppercase tracking-plate text-gk-rook">
              {t("about.sub")}
            </p>
          </Reveal>

          <Reveal delay={200} className="ml-auto">
            <MartiniClock className="h-[clamp(15rem,44vw,26rem)] w-auto" />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
