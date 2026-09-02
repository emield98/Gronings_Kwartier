"use client"

import { useEffect, useMemo, useState } from "react"
import { getSaleStart, type Event } from "@/lib/events"

// Before the browser has told us the time, every sale reads as still to come.
// The HTML is baked at build time — before any sale opens — so assuming
// anything else here would disagree with the server on hydration.
const BEFORE_EVERY_SALE = new Date(0)

/**
 * The clock the ticket UI reads, instead of the one the build was made on.
 *
 * Returns the current instant, re-rendering the moment one of these editions
 * goes on sale — so a page left open at 19:59 shows the shop at 20:00 without
 * a refresh or a redeploy. Feed it to `getEventStatus` / `shouldShowTickets`.
 */
export function useSaleClock(events: Event[]): Date {
  const [now, setNow] = useState<Date | null>(null)

  // The earliest sale still waiting to open, if there is one.
  const nextOpeningMs = useMemo(() => {
    const pending = events
      .map(getSaleStart)
      .filter((start): start is Date => start !== null)
      .map((start) => start.getTime())
      .filter((ms) => ms > (now?.getTime() ?? 0))
    return pending.length > 0 ? Math.min(...pending) : null
  }, [events, now])

  useEffect(() => {
    setNow(new Date())
    if (nextOpeningMs === null) return

    // Polled rather than scheduled: setTimeout drifts across a sleeping laptop
    // and silently fires early beyond ~24 days out.
    const id = window.setInterval(() => {
      if (Date.now() >= nextOpeningMs) setNow(new Date())
    }, 1000)
    return () => window.clearInterval(id)
  }, [nextOpeningMs])

  return now ?? BEFORE_EVERY_SALE
}
