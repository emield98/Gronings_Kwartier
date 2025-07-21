export interface Event {
  id: string
  date: string
  startTime: string
  endTime: string
  title: string
  artist: string
  venue: string
  address: string
  type: 'day' | 'night'
  status: 'tickets-available' | 'sold-out' | 'coming-soon'
  description?: string
  genres: string[]
  // Ticket section specific fields
  ticketDate: string // Format: "30 aug"
  datetime: string // Format: "30 augustus 2025 om 17:30 – 30 augustus 2025 om 22:00"
  location: string // Venue name for tickets
  ticketVenue: string // Additional venue info for tickets
  ticketUrl: string // URL for purchasing tickets
}

export const events: Event[] = [
  {
    id: 'gronings-kwartier-zomereditie-2025',
    date: '2025-11-08',
    startTime: '20:00',
    endTime: '04:00',
    title: 'Gronings Kwartier Zomereditie',
    artist: 'Gronings Kwartier Zomereditie',
    venue: 'De Huiskamer',
    address: 'Suikerlaan 18, 9743 DA Groningen',
    type: 'night',
    status: 'tickets-available',
    description: 'Join us for an unforgettable night of electronic music in the heart of Groningen.',
    genres: ['Electronic', 'Techno', 'House'],
    ticketDate: '8 nov',
    datetime: '8 november 2025 om 20:00 – 9 november 2025 om 04:00',
    location: 'De Huiskamer',
    ticketVenue: 'Suikerlaan 18, 9743 DA Groningen',
    ticketUrl: 'https://eventix.io'
  }
]

// Helper functions to filter events
export const getUpcomingEvents = () => {
  const now = new Date()
  return events.filter(event => new Date(event.date) >= now)
}

export const getEventById = (id: string) => {
  return events.find(event => event.id === id)
}

export const getEventsByStatus = (status: Event['status']) => {
  return events.filter(event => event.status === status)
}
