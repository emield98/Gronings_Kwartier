"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, Menu, X, Clock, MapPin, Instagram, Music } from "lucide-react"
import { events, getUpcomingEvents } from "@/lib/events"

export default function GroningsKwartierWebsite() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "events", "tickets", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  // Get upcoming events from the centralized events file
  const upcomingEvents = getUpcomingEvents()

  return (
    <div className="bg-black text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold tracking-wider">GK</div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {["home", "about", "events", "tickets", "contact"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm uppercase tracking-wider transition-colors hover:text-cyan-400 ${activeSection === section ? "text-cyan-400" : "text-gray-300"
                    }`}
                >
                  {section}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-800">
              <div className="flex flex-col space-y-4 mt-4">
                {["home", "about", "events", "tickets", "contact"].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className="text-left text-sm uppercase tracking-wider transition-colors hover:text-cyan-400"
                  >
                    {section}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Home Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/header.mp4" type="video/mp4" />
            {/* Fallback background image if video fails to load */}
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/placeholder.svg?height=1080&width=1920')`,
              }}
            />
          </video>
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 animate-fade-in">
            GRONINGS
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">KWARTIER</span>
          </h1>
          <Button
            onClick={() => scrollToSection("tickets")}
            className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-none transition-all duration-300 transform hover:scale-105"
          >
            GET TICKETS
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown size={32} className="text-gray-400" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl font-black mb-8 leading-tight">
                What is
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-500">
                  Gronings Kwartier?
                </span>
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                Gronings Kwartier started as a techno party on the island known as Derde Kwartier, near the Hoornseplas in Groningen. What began as a laid-back gathering with friends has since grown into a full-scale event, complete with ticketed entry, a dedicated location, and a growing audience.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                The festival is organized by a group of friends who all live in Groningen. What connects them is a shared love for electronic music and the energy that comes with organizing something together. Gronings Kwartier keeps that original spirit alive, rooted in community, built with care, and driven by the music.
              </p>
            </div>
            <div className="relative">
              <div
                className="aspect-square bg-cover bg-center rounded-lg"
                style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('/about.jpg?height=600&width=600')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl md:text-6xl font-black text-center mb-16">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">EVENTS</span>
          </h2>

          <div className="grid gap-6 max-w-6xl mx-auto">
            {upcomingEvents.map((event, index) => (
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
                        <div className="text-3xl font-black text-white">{new Date(event.date).getDate()}</div>
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
                            <span className="font-mono font-semibold">{event.startTime} - {event.endTime}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-300">
                            <MapPin size={16} />
                            <span>{event.venue}</span>
                          </div>
                        </div>

                        {/* Address */}
                        <div className="mt-2 text-sm text-gray-400">
                          📍 {event.address}
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
                        <div className={`w-2 h-2 rounded-full animate-pulse ${
                          event.status === 'tickets-available' ? 'bg-green-500' : 
                          event.status === 'sold-out' ? 'bg-red-500' : 'bg-yellow-500'
                        }`} />
                        <span className={`font-semibold ${
                          event.status === 'tickets-available' ? 'text-green-400' : 
                          event.status === 'sold-out' ? 'text-red-400' : 'text-yellow-400'
                        }`}>
                          {event.status === 'tickets-available' ? 'Tickets Available' : 
                           event.status === 'sold-out' ? 'Sold Out' : 'Coming Soon'}
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

      {/* Tickets Section */}
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

          {/* Ticket Cards */}
          <div className="grid md:grid-cols-1 gap-6 max-w-3xl mx-auto mb-20">
            {upcomingEvents.map((event, index) => {
              const [day, month] = event.ticketDate.split(' ')
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
                    <p className="text-sm text-gray-300 mt-1">{event.datetime}</p>
                    <p className="text-sm mt-4">{event.location}</p>
                    <p className="text-sm text-gray-400">{event.ticketVenue}</p>
                    <div className="mt-3 text-xs text-cyan-400">
                      Click to purchase tickets →
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl md:text-6xl font-black text-center mb-16">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-500">CONTACT</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-16 max-w-4xl mx-auto">
            <div>
              <form className="space-y-6">
                <Input
                  placeholder="Name"
                  className="bg-gray-900/50 border-gray-800 text-white placeholder-gray-400 h-12"
                />
                <Input
                  type="email"
                  placeholder="Email"
                  className="bg-gray-900/50 border-gray-800 text-white placeholder-gray-400 h-12"
                />
                <Textarea
                  placeholder="Message"
                  rows={10}
                  className="bg-gray-900/50 border-gray-800 text-white placeholder-gray-400 resize-none"
                />
                <Button className="w-full bg-gradient-to-r from-green-500 to-cyan-600 hover:from-green-600 hover:to-cyan-700 h-12 font-semibold">
                  SEND MESSAGE
                </Button>
              </form>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Get in touch</h3>
                <p className="text-gray-400 mb-6">
                  Questions about the festival? Want to become a partner? We'd love to hear from you.
                </p>
                <div className="text-cyan-400 font-mono">info@groningskwartier.nl</div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Follow us</h3>
                <div className="flex space-x-4">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="border-gray-700 hover:bg-gray-800 bg-transparent"
                    onClick={() => window.open('https://www.instagram.com/groningskwartier', '_blank')}
                  >
                    <Instagram size={20} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 border-t border-gray-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="text-2xl font-black tracking-wider">GK</div>
            </div>
            <div className="text-sm text-gray-400">© 2024 Gronings Kwartier. All rights reserved.</div>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        body {
          font-family: 'Inter', sans-serif;
        }
      `}</style>
    </div>
  )
}
