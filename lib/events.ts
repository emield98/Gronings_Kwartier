export interface Event {
  id: string
  date: string
  startTime: string
  endTime: string
  title: string
  edition: string
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
    id: 'gronings-kwartier-zomereditie-2025',
    date: '2025-11-08',
    startTime: '20:00',
    endTime: '04:00',
    title: 'Gronings Kwartier Zomereditie',
    edition: 'Gronings Kwartier Zomereditie',
    venue: 'De Huiskamer',
    address: 'Suikerlaan 18, 9743 DA Groningen',
    type: 'night',
    status: 'tickets-available',
    description: 'Join us for an unforgettable night of electronic music in the heart of Groningen.',
    genres: ['Electronic', 'Techno', 'House'],
    ticketUrl: 'https://shop.weeztix.com/c7e2a4e0-9ddf-11ef-a9cb-7e126431635e?shop_code=qr9y6we3'
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

// Helper function to check if tickets should be shown
export const shouldShowTickets = (event: Event) => {
  return event.status === 'tickets-available' && event.ticketUrl
}

// Helper function to get formatted date for display
export const getFormattedDate = (event: Event) => {
  const date = new Date(event.date)
  const day = date.getDate()
  const month = date.toLocaleDateString('nl-NL', { month: 'short' })
  return `${day} ${month}`
}

// Helper function to get formatted datetime for display
export const getFormattedDateTime = (event: Event) => {
  const date = new Date(event.date)
  const startTime = event.startTime
  const endTime = event.endTime
  
  const dateStr = date.toLocaleDateString('nl-NL', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  })
  
  // Handle end time that goes to next day
  const endDate = new Date(event.date)
  if (event.endTime < event.startTime) {
    endDate.setDate(endDate.getDate() + 1)
  }
  
  const endDateStr = endDate.toLocaleDateString('nl-NL', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  })
  
  return `${dateStr} om ${startTime} – ${endDateStr} om ${endTime}`
}
