"use client"

import { ArrowRight, Instagram } from "lucide-react"
import {
  Event,
  shouldShowTickets,
  getFormattedDate,
  getFormattedDateTime,
  getLongDate,
} from "@/lib/events"
import { useLanguage } from "@/components/language-provider"
import { SectionHeading } from "@/components/section-heading"
import Reveal from "@/components/reveal"
import { siteConfig } from "@/config/site"

interface TicketsSectionProps {
  events: Event[]
}

export default function TicketsSection({ events }: TicketsSectionProps) {
  const { language, t } = useLanguage()

  const availableEvents = events.filter(shouldShowTickets)
  const nextEvent = events[0]

  return (
    <section
      id="tickets"
      className="gk-grain relative overflow-hidden bg-gk-ink py-24 md:py-32"
    >
      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <Reveal>
          <SectionHeading plate={t("tickets.plate")} title={t("tickets.title")} />
        </Reveal>

        {availableEvents.length > 0 ? (
          <div className="mt-12 flex flex-col gap-5">
            {availableEvents.map((event, index) => {
              const [day, month] = getFormattedDate(event, language).split(" ")
              return (
                <Reveal key={event.id} delay={index * 90}>
                  <a
                    href={event.ticketUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group flex border border-gk-staal bg-gk-beton transition-colors duration-300 hover:border-gk-oranje"
                  >
                    {/* Stub */}
                    <div className="flex w-24 shrink-0 flex-col items-center justify-center border-r border-dashed border-gk-staal bg-gk-oranje px-3 py-6 text-gk-ink sm:w-28">
                      <span className="gk-tnum font-display text-4xl font-black leading-none">
                        {day}
                      </span>
                      <span className="mt-1 font-mono text-[0.65rem] uppercase tracking-plate">
                        {month}
                      </span>
                    </div>

                    <div className="min-w-0 flex-1 px-6 py-6">
                      <h3 className="gk-display text-2xl text-gk-kalk transition-colors group-hover:text-gk-oranje">
                        {event.title}
                      </h3>
                      <p className="gk-tnum mt-2 font-mono text-xs text-gk-rook">
                        {getFormattedDateTime(event, language, t("tickets.dateTimeJoin"))}
                      </p>
                      <p className="mt-4 text-sm text-gk-kalk">{event.venue}</p>
                      <p className="text-sm text-gk-rook">{event.address}</p>
                      <span className="mt-5 inline-flex items-center gap-2 font-mono text-[0.65rem] font-bold uppercase tracking-plate text-gk-oranje">
                        {t("tickets.cta")}
                        <ArrowRight
                          size={13}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </span>
                    </div>
                  </a>
                </Reveal>
              )
            })}
          </div>
        ) : nextEvent ? (
          // Sale has not opened yet — a deliberate state, not an empty one.
          <Reveal delay={100}>
            <div className="gk-bracket mt-12 border border-gk-staal bg-gk-beton">
              <div aria-hidden="true" className="gk-hazard h-2 w-full" />

              <div className="grid gap-10 p-8 md:grid-cols-5 md:p-12">
                <div className="md:col-span-3">
                  <h3 className="gk-display text-[clamp(2rem,6vw,3.25rem)] text-gk-kalk">
                    {nextEvent.status === "sold-out"
                      ? t("tickets.empty.title")
                      : t("tickets.soon.title")}
                  </h3>
                  <p className="mt-5 max-w-prose leading-relaxed text-gk-rook">
                    {t("tickets.soon.body", { date: getLongDate(nextEvent, language) })}
                  </p>
                  <a
                    href={siteConfig.links.instagram}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group mt-8 inline-flex items-center gap-3 bg-gk-oranje px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-plate text-gk-ink transition-colors hover:bg-gk-kalk"
                  >
                    <Instagram size={15} />
                    {t("tickets.soon.cta")}
                  </a>
                </div>

                {/* Blank stub — the ticket that does not exist yet */}
                <div className="md:col-span-2">
                  <div className="flex h-full flex-col justify-between border border-dashed border-gk-staal p-6">
                    <div>
                      <span className="font-mono text-[0.6rem] uppercase tracking-plate text-gk-rook">
                        {nextEvent.title}
                      </span>
                      <p className="gk-tnum mt-4 font-display text-5xl font-black leading-none text-gk-rook/60">
                        {getLongDate(nextEvent, language).split(" ")[0]}
                      </p>
                      <p className="mt-2 font-mono text-sm uppercase tracking-plate text-gk-rook/60">
                        {getLongDate(nextEvent, language).split(" ").slice(1).join(" ")}
                      </p>
                    </div>
                    <dl className="mt-8 space-y-3 border-t border-gk-staal pt-5">
                      <div>
                        <dt className="font-mono text-[0.6rem] uppercase tracking-plate text-gk-rook">
                          {t("hero.venue")}
                        </dt>
                        <dd className="mt-1 text-sm text-gk-kalk">{nextEvent.venue}</dd>
                      </div>
                      <div>
                        <dt className="font-mono text-[0.6rem] uppercase tracking-plate text-gk-rook">
                          {t("hero.doors")}
                        </dt>
                        <dd className="gk-tnum mt-1 font-mono text-sm text-gk-kalk">
                          {nextEvent.startTime} – {nextEvent.endTime}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        ) : (
          <Reveal delay={100}>
            <div className="mt-12 border border-gk-staal bg-gk-beton p-10 text-center">
              <h3 className="gk-display text-3xl text-gk-kalk">{t("tickets.empty.title")}</h3>
              <p className="mt-4 text-gk-rook">
                {t("tickets.empty.line1")}
                <br />
                {t("tickets.empty.line2")}
              </p>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}
