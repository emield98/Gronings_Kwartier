"use client"

import { Instagram } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { siteConfig } from "@/config/site"
import { getUpcomingEvents, getLongDate, getMapsUrl } from "@/lib/events"

export default function Footer() {
  const { language, t } = useLanguage()
  const nextEvent = getUpcomingEvents()[0]

  return (
    <footer className="bg-gk-ink">
      <div aria-hidden="true" className="gk-hazard h-2 w-full" />

      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="grid justify-items-center gap-10 text-center md:grid-cols-2 md:items-start">
          <div className="shrink-0">
            <a href="/" aria-label={t("nav.home.aria")} className="inline-block">
              <img src="/logo.png" alt={siteConfig.name} className="h-12 w-auto object-contain" />
            </a>
            {nextEvent && (
              <p className="mt-5 max-w-[16rem]">
                <span className="gk-display block text-2xl text-gk-kalk">{siteConfig.name}</span>
                <span className="mt-1 block font-mono text-xs uppercase tracking-plate text-gk-oranje">
                  {getLongDate(nextEvent, language)}
                </span>
              </p>
            )}
          </div>

          <div className="grid gap-8">

            <div>
              <span className="font-mono text-[0.6rem] uppercase tracking-plate text-gk-rook">
                {t("contact.followUs.title")}
              </span>
              <div className="mt-3 flex flex-col items-center gap-3">
                <a
                  href={siteConfig.links.instagram}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2.5 text-sm text-gk-kalk transition-colors hover:text-gk-oranje"
                >
                  <Instagram size={15} />
                  @groningskwartier
                </a>
                <a
                  href={`mailto:${siteConfig.links.email}`}
                  className="font-mono text-sm text-gk-rook transition-colors hover:text-gk-oranje"
                >
                  {siteConfig.links.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gk-staal pt-6">
          <p className="font-mono text-[0.65rem] uppercase tracking-plate text-gk-rook">
            {t("footer.rights", { year: String(new Date().getFullYear()) })}
          </p>
        </div>
      </div>
    </footer>
  )
}
