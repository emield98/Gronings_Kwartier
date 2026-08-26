import type { Language } from '@/lib/i18n/config'
import { monthNames } from '@/lib/i18n/translations'

export interface Event {
  id: string
  date: string
  startTime: string
  endTime: string
  title: string
  edition: string
  /** Venue for this edition only — the festival has no permanent home. */
  venue: string
  address: string
  type: 'day' | 'night'
  status: 'tickets-available' | 'sold-out' | 'coming-soon'
  description?: string
  genres: string[]
  ticketUrl?: string // Only show when status is 'tickets-available'
}

export const events: Event[] = [
  {
    id: 'gronings-kwartier-2026',
    date: '2026-10-31',
    startTime: '20:00',
    endTime: '04:00',
    title: 'Gronings Kwartier 2026',
    edition: '2026',
    venue: 'De Huiskamer',
    address: 'Suikerlaan 18, 9743 DA Groningen',
    type: 'night',
    status: 'coming-soon',
    genres: ['Electronic', 'Techno', 'House']
  },
  {
    id: 'gronings-kwartier-editie-2025',
    date: '2025-11-08',
    startTime: '20:00',
    endTime: '04:00',
    title: 'Gronings Kwartier',
    edition: '2025',
    venue: 'De Huiskamer',
    address: 'Suikerlaan 18, 9743 DA Groningen',
    type: 'night',
    status: 'sold-out',
    genres: ['Electronic', 'Techno', 'House']
  }
]

// The edition the whole page is built around: the next one coming up.
export const getHeadlineEvent = () => getUpcomingEvents()[0]

// Event times are Groningen wall-clock time. 31-10-2026 falls after the EU
// clock change, so CET (+01:00) applies. Revisit this for summer editions.
const EVENT_UTC_OFFSET = '+01:00'

// Start of doors, as an absolute instant. Used by the countdown.
export const getEventStart = (event: Event) =>
  new Date(`${event.date}T${event.startTime}:00${EVENT_UTC_OFFSET}`)

// Helper functions to filter events
export const getUpcomingEvents = () => {
  const now = new Date()
  // Consider event still upcoming if its end datetime is >= now.
  // This handles events that occur today (so they don't disappear at 00:00 of the day).
  return events.filter((event) => {
    // build start and end datetimes from date + times
    const start = new Date(`${event.date}T${event.startTime}`)
    let end = new Date(`${event.date}T${event.endTime}`)
    // if end time is less than start time assume it ends the next day
    if (event.endTime < event.startTime) {
      end.setDate(end.getDate() + 1)
    }
    return end >= now
  })
}

export const getEventById = (id: string) => {
  return events.find(event => event.id === id)
}

export const getEventsByStatus = (status: Event['status']) => {
  return events.filter(event => event.status === status)
}

// Helper function to check if tickets should be shown
export const shouldShowTickets = (event: Event) => {
  return event.status === 'tickets-available' && event.ticketUrl
}

// Map link for an edition's venue.
export const getMapsUrl = (event: Event) =>
  `https://maps.google.com/?q=${encodeURIComponent(`${event.venue}, ${event.address}`)}`

// Stamped date used on plates and stencils, e.g. "31.10.26"
export const getStampDate = (event: Event) => {
  const date = new Date(event.date)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${String(date.getFullYear()).slice(-2)}`
}

// Helper function to get a written-out date, e.g. "31 oktober 2026"
export const getLongDate = (event: Event, language: Language) => {
  const date = new Date(event.date)
  return `${date.getDate()} ${monthNames[language].long[date.getMonth()]} ${date.getFullYear()}`
}

// Helper function to get a short month label in the given language
export const getShortMonth = (event: Event, language: Language) => {
  return monthNames[language].short[new Date(event.date).getMonth()]
}

// Helper function to get formatted date for display, e.g. "8 nov"
export const getFormattedDate = (event: Event, language: Language) => {
  const date = new Date(event.date)
  return `${date.getDate()} ${monthNames[language].short[date.getMonth()]}`
}

// Helper function to get formatted datetime for display
export const getFormattedDateTime = (event: Event, language: Language, join = 'om') => {
  const formatLong = (date: Date) =>
    `${date.getDate()} ${monthNames[language].long[date.getMonth()]} ${date.getFullYear()}`

  const date = new Date(event.date)

  // Handle end time that goes to next day
  const endDate = new Date(event.date)
  if (event.endTime < event.startTime) {
    endDate.setDate(endDate.getDate() + 1)
  }

  return `${formatLong(date)} ${join} ${event.startTime} – ${formatLong(endDate)} ${join} ${event.endTime}`
}
