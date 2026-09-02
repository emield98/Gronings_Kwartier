"use client"

import { ArrowRight, MapPin } from "lucide-react"
import { Event, shouldShowTickets, getEventStatus, getShortMonth } from "@/lib/events"
import { useLanguage } from "@/components/language-provider"
import { useSaleClock } from "@/hooks/use-sale-clock"
import { SectionHeading } from "@/components/section-heading"
import Reveal from "@/components/reveal"
import { cn } from "@/lib/utils"

interface EventsSectionProps {
  events: Event[]
  scrollToSection: (sectionId: string) => void
}

// Signal colours: orange = on sale, yellow = waiting, steel = closed.
const STATUS_STYLE: Record<Event["status"], { dot: string; text: string }> = {
  "tickets-available": { dot: "bg-gk-oranje", text: "text-gk-oranje" },
  "coming-soon": { dot: "bg-gk-geel", text: "text-gk-geel" },
  "sold-out": { dot: "bg-gk-rook", text: "text-gk-rook" },
}

export default function EventsSection({ events, scrollToSection }: EventsSectionProps) {
  const { language, t } = useLanguage()
  const now = useSaleClock(events)

  const statusLabel = (status: Event["status"]) =>
    status === "tickets-available"
      ? t("events.status.available")
      : status === "sold-out"
        ? t("events.status.soldOut")
        : t("events.status.comingSoon")

  return (
    <section id="events" className="gk-grain relative overflow-hidden bg-gk-beton py-24 md:py-32">
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeading plate={t("events.plate")} title={t("events.title")} />
        </Reveal>

        {events.length === 0 ? (
          <Reveal delay={100}>
            <p className="mt-12 max-w-prose text-gk-rook">{t("events.empty")}</p>
          </Reveal>
        ) : (
          <div className="mt-12 flex flex-col gap-5">
            {events.map((event, index) => {
              const status = getEventStatus(event, now)
              const signal = STATUS_STYLE[status]
              const date = new Date(event.date)

              return (
                <Reveal key={event.id} delay={index * 90}>
                  <article className="group border border-gk-staal bg-gk-beton/60 transition-colors duration-300 hover:border-gk-oranje/60">
                    <div className="flex flex-col sm:flex-row">
                      {/* Stamped date plate */}
                      <div className="flex shrink-0 items-center gap-4 border-b border-gk-staal px-6 py-5 sm:w-32 sm:flex-col sm:items-start sm:justify-center sm:gap-0 sm:border-b-0 sm:border-r sm:py-7">
                        <span className="gk-tnum font-display text-5xl font-black leading-none text-gk-kalk">
                          {date.getDate()}
                        </span>
                        <div className="flex items-baseline gap-2 sm:mt-1.5 sm:flex-col sm:gap-0">
                          <span className="font-mono text-xs uppercase tracking-plate text-gk-oranje">
                            {getShortMonth(event, language)}
                          </span>
                          <span className="gk-tnum font-mono text-xs text-gk-rook sm:mt-1">
                            {date.getFullYear()}
                          </span>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="min-w-0 flex-1 px-6 py-6">
                        <div className="flex flex-wrap items-start justify-between gap-4">
                          <h3 className="gk-display text-2xl text-gk-kalk transition-colors group-hover:text-gk-oranje md:text-3xl">
                            {event.title}
                          </h3>
                          <span className="flex items-center gap-2">
                            <span
                              aria-hidden="true"
                              className={cn("h-1.5 w-1.5 animate-gk-led", signal.dot)}
                            />
                            <span
                              className={cn(
                                "font-mono text-[0.65rem] uppercase tracking-plate",
                                signal.text,
                              )}
                            >
                              {statusLabel(status)}
                            </span>
                          </span>
                        </div>

                        <dl className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                          <div>
                            <dt className="font-mono text-[0.6rem] uppercase tracking-plate text-gk-rook">
                              {t("events.doors")}
                            </dt>
                            <dd className="gk-tnum mt-1 font-mono text-sm text-gk-kalk">
                              {event.startTime} – {event.endTime}
                            </dd>
                          </div>
                          <div>
                            <dt className="font-mono text-[0.6rem] uppercase tracking-plate text-gk-rook">
                              {t("events.venue")}
                            </dt>
                            <dd className="mt-1 text-sm text-gk-kalk">{event.venue}</dd>
                          </div>
                        </dl>

                        <p className="mt-4 flex items-start gap-2 text-sm text-gk-rook">
                          <MapPin size={15} className="mt-0.5 shrink-0 text-gk-rook" />
                          {event.address}
                        </p>
                      </div>
                    </div>

                    {/* Footer strip */}
                    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gk-staal px-6 py-4">
                      <p className="font-mono text-[0.65rem] uppercase tracking-plate text-gk-rook">
                        <span className="text-gk-rook/70">{t("events.music")}</span>{" "}
                        {event.genres.join(" · ")}
                      </p>

                      {shouldShowTickets(event, now) ? (
                        <button
                          onClick={() => scrollToSection("tickets")}
                          className="group/cta inline-flex items-center gap-2 bg-gk-oranje px-5 py-2.5 font-mono text-[0.65rem] font-bold uppercase tracking-plate text-gk-ink transition-colors hover:bg-gk-kalk"
                        >
                          {t("events.cta")}
                          <ArrowRight
                            size={13}
                            className="transition-transform duration-300 group-hover/cta:translate-x-0.5"
                          />
                        </button>
                      ) : (
                        <span className="border border-gk-staal px-5 py-2.5 font-mono text-[0.65rem] uppercase tracking-plate text-gk-rook">
                          {getEventStatus(event, now) === "sold-out"
                            ? t("events.cta.soldOut")
                            : t("events.cta.comingSoon")}
                        </span>
                      )}
                    </div>
                  </article>
                </Reveal>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
