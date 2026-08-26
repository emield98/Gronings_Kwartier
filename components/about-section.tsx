"use client"

import { useLanguage } from "@/components/language-provider"
import Reveal from "@/components/reveal"

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

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Conduit: an orange run drops out of the counter strip and lands on
            the plate, carrying the eye from the hero into the statement. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-6 top-0 h-16 w-px overflow-hidden bg-gradient-to-b from-gk-oranje/70 to-gk-staal md:h-20"
        >
          <span className="animate-gk-drop absolute inset-x-0 top-0 block h-4 bg-gk-oranje" />
        </div>

        <div className="pt-16 md:pt-20">
          {/* The conduit lands here: the same mark that sits in the bar above,
              so the eye recognises where it has been carried to. */}
          <Reveal>
            <img
              src="/logo.png"
              alt=""
              aria-hidden="true"
              className="h-16 w-auto object-contain md:h-20"
            />
          </Reveal>

          {/* The statement is the section. Set close to the wordmark's scale so
              it reads as the hero's next line, and each line rises out from
              behind its own baseline. */}
          <h2 className="gk-display mt-10 text-[clamp(2.5rem,12.5vw,11.5rem)] text-gk-kalk">
            <Reveal variant="mask">
              <span className="block">{t("about.statement.line1")}</span>
            </Reveal>
            <Reveal variant="mask" delay={130}>
              <span className="block pl-[6%]">{t("about.statement.line2")}</span>
            </Reveal>
            <Reveal variant="mask" delay={260}>
              <span className="gk-flicker block pl-[12%] text-gk-oranje">
                {t("about.statement.line3")}
              </span>
            </Reveal>
          </h2>

          <Reveal delay={420}>
            <p className="mt-10 pl-[12%] font-mono text-xs uppercase tracking-plate text-gk-rook">
              {t("about.sub")}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
