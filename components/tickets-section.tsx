"use client"

import { ArrowRight, Instagram } from "lucide-react"
import {
  Event,
  getEventStatus,
  shouldShowTickets,
  getFormattedDate,
  getFormattedDateTime,
  getLongDate,
  getSaleMoment,
} from "@/lib/events"
import { useLanguage } from "@/components/language-provider"
import { useSaleClock } from "@/hooks/use-sale-clock"
import { SectionHeading } from "@/components/section-heading"
import Reveal from "@/components/reveal"
import { siteConfig } from "@/config/site"

interface TicketsSectionProps {
  events: Event[]
}

export default function TicketsSection({ events }: TicketsSectionProps) {
  const { language, t } = useLanguage()
  const now = useSaleClock(events)

  const availableEvents = events.filter((event) => shouldShowTickets(event, now))
  const nextEvent = events[0]
  const saleMoment = nextEvent ? getSaleMoment(nextEvent, language) : null

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
                    // Stub and details sit side by side; the call to action drops
                    // to its own full-width bar below them until there is room
                    // for it on the same line.
                    className="group grid grid-cols-[auto_1fr] border border-gk-staal bg-gk-beton transition-colors duration-300 hover:border-gk-oranje lg:grid-cols-[auto_1fr_auto] lg:items-stretch"
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

                    <div className="min-w-0 px-6 py-6">
                      <h3 className="gk-display text-2xl text-gk-kalk transition-colors group-hover:text-gk-oranje">
                        {event.title}
                      </h3>
                      <p className="gk-tnum mt-2 font-mono text-xs text-gk-rook">
                        {getFormattedDateTime(event, language, t("tickets.dateTimeJoin"))}
                      </p>
                      <p className="mt-4 text-sm text-gk-kalk">{event.venue}</p>
                      <p className="text-sm text-gk-rook">{event.address}</p>
                    </div>

                    {/* The whole card is the link; this is the part that says so. */}
                    <span className="col-span-2 flex items-center justify-center gap-3 border-t border-gk-staal bg-gk-oranje px-5 py-4 font-mono text-[0.7rem] font-bold uppercase tracking-plate text-gk-ink transition-colors duration-300 group-hover:bg-gk-kalk sm:text-xs lg:col-span-1 lg:m-6 lg:self-center lg:border-t-0 lg:px-6">
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 shrink-0 animate-gk-led bg-gk-ink"
                      />
                      <span className="text-center">{t("tickets.cta")}</span>
                      <ArrowRight
                        size={16}
                        className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </span>
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
                    {getEventStatus(nextEvent, now) === "sold-out"
                      ? t("tickets.empty.title")
                      : t("tickets.soon.title")}
                  </h3>
                  <p className="mt-5 max-w-prose leading-relaxed text-gk-rook">
                    {saleMoment
                      ? t("tickets.soon.saleAt", {
                          date: getLongDate(nextEvent, language),
                          saleDate: saleMoment.date,
                          saleTime: saleMoment.time,
                        })
                      : t("tickets.soon.body", { date: getLongDate(nextEvent, language) })}
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
                      {saleMoment && (
                        <div>
                          <dt className="font-mono text-[0.6rem] uppercase tracking-plate text-gk-rook">
                            {t("tickets.plate")}
                          </dt>
                          <dd className="gk-tnum mt-1 font-mono text-sm text-gk-geel">
                            {t("tickets.sale.opens", {
                              saleDate: saleMoment.date,
                              saleTime: saleMoment.time,
                            })}
                          </dd>
                        </div>
                      )}
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
