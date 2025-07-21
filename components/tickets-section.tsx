import { Event, shouldShowTickets, getFormattedDate, getFormattedDateTime } from "@/lib/events"

interface TicketsSectionProps {
  events: Event[]
}

export default function TicketsSection({ events }: TicketsSectionProps) {
  // Only show events with tickets available
  const availableEvents = events.filter(shouldShowTickets)

  return (
    <section id="tickets" className="py-24 bg-gray-900 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-5xl md:text-6xl font-black text-center mb-16">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            TICKETS
          </span>
        </h2>

        {availableEvents.length === 0 ? (
          // No tickets available message
          <div className="text-center max-w-2xl mx-auto">
            <div className="bg-neutral-800/50 rounded-lg p-12 border border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-4">No Tickets Available</h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                There are currently no tickets available for purchase. 
                <br />
                Check back soon or follow us on social media for updates!
              </p>
            </div>
          </div>
        ) : (
          // Ticket Cards
          <div className="grid md:grid-cols-1 gap-6 max-w-3xl mx-auto mb-20">
          {availableEvents.map((event, index) => {
            const formattedDate = getFormattedDate(event)
            const [day, month] = formattedDate.split(' ')
            return (
              <div
                key={event.id}
                className="flex bg-neutral-800 rounded-lg overflow-hidden shadow-lg transition hover:scale-[1.01] cursor-pointer"
                onClick={() => window.open(event.ticketUrl, '_blank')}
              >
                <div className="bg-[#2d384d] text-center px-4 py-6 flex flex-col justify-center w-24">
                  <span className="text-3xl font-bold text-white">{day}</span>
                  <span className="uppercase text-gray-300">{month}</span>
                </div>
                <div className="p-4 flex-1 text-white">
                  <h3 className="text-xl font-semibold">{event.title}</h3>
                  <p className="text-sm text-gray-300 mt-1">{getFormattedDateTime(event)}</p>
                  <p className="text-sm mt-4">{event.venue}</p>
                  <p className="text-sm text-gray-400">{event.address}</p>
                  <div className="mt-3 text-xs text-cyan-400">
                    Click to purchase tickets →
                  </div>
                </div>
              </div>
            )
          })}
          </div>
        )}
      </div>
    </section>
  )
}
