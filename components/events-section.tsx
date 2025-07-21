import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, MapPin, Home } from "lucide-react"
import { Event } from "@/lib/events"

interface EventsSectionProps {
  events: Event[]
  scrollToSection: (sectionId: string) => void
}

export default function EventsSection({ events, scrollToSection }: EventsSectionProps) {
  return (
    <section id="events" className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <h2 className="text-5xl md:text-6xl font-black text-center mb-16">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            EVENTS
          </span>
        </h2>

        <div className="grid gap-6 max-w-6xl mx-auto">
          {events.map((event, index) => (
            <Card
              key={event.id}
              className="bg-gradient-to-r from-gray-900/90 to-gray-800/90 border border-gray-700 hover:border-cyan-400/50 transition-all duration-500 group backdrop-blur-sm"
            >
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  {/* Date and Time Section */}
                  <div className="flex items-center space-x-8">
                    <div className="text-center bg-gradient-to-br from-cyan-500/20 to-purple-500/20 p-4 rounded-lg border border-cyan-400/30">
                      <div className="text-xs text-cyan-400 uppercase tracking-wider font-semibold">
                        {new Date(event.date).toLocaleDateString("en-US", { month: "short" })}
                      </div>
                      <div className="text-3xl font-black text-white">
                        {new Date(event.date).getDate()}
                      </div>
                      <div className="text-xs text-gray-400">
                        {new Date(event.date).toLocaleDateString("en-US", { year: "numeric" })}
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="flex-1">
                      <h3 className="text-2xl md:text-3xl font-black group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-500 transition-all duration-300 mb-2">
                        {event.artist}
                      </h3>

                      <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm">
                        <div className="flex items-center space-x-2 text-cyan-400">
                          <Clock size={16} />
                          <span className="font-mono font-semibold">
                            {event.startTime} - {event.endTime}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-300">
                          <Home size={16} />
                          <span>{event.venue}</span>
                        </div>
                      </div>

                      {/* Address */}
                      <div className="flex mt-2 text-sm text-gray-400">
                        <MapPin size={16} />
                        <span className="ml-2">{event.address}</span>
                      </div>
                    </div>
                  </div>

                  {/* Status and Action Section */}
                  <div className="flex items-center space-x-4">
                    <Button
                      onClick={() => scrollToSection("tickets")}
                      className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-6 py-2 font-semibold transition-all duration-300 transform hover:scale-105"
                    >
                      GET TICKETS
                    </Button>
                  </div>
                </div>

                {/* Additional Event Info */}
                <div className="mt-6 pt-6 border-t border-gray-700/50">
                  <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-gray-400">
                    <div className="flex items-center space-x-6">
                      <span>🎵 {event.genres.join(' • ')}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-2 h-2 rounded-full animate-pulse ${
                          event.status === 'tickets-available'
                            ? 'bg-green-500'
                            : event.status === 'sold-out'
                            ? 'bg-red-500'
                            : 'bg-yellow-500'
                        }`}
                      />
                      <span
                        className={`font-semibold ${
                          event.status === 'tickets-available'
                            ? 'text-green-400'
                            : event.status === 'sold-out'
                            ? 'text-red-400'
                            : 'text-yellow-400'
                        }`}
                      >
                        {event.status === 'tickets-available'
                          ? 'Tickets Available'
                          : event.status === 'sold-out'
                          ? 'Sold Out'
                          : 'Coming Soon'}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
