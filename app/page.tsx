"use client"

import { getUpcomingEvents, getEventStart } from "@/lib/events"
import { useActiveSection, scrollToSection } from "@/hooks/use-navigation"
import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"
import Countdown from "@/components/countdown"
import AboutSection from "@/components/about-section"
import EventsSection from "@/components/events-section"
import TicketsSection from "@/components/tickets-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"

export default function GroningsKwartierWebsite() {
  const activeSection = useActiveSection()
  const upcomingEvents = getUpcomingEvents()
  const headlineEvent = upcomingEvents[0]

  return (
    <div className="overflow-x-hidden bg-gk-ink text-gk-kalk">
      <Navigation activeSection={activeSection} scrollToSection={scrollToSection} />

      <HeroSection event={headlineEvent} scrollToSection={scrollToSection} />

      {/* The gauge is bolted over the seam between the hero and the page. */}
      {headlineEvent && (
        <div className="relative z-20 -mt-12 px-6 md:-mt-16">
          <div className="mx-auto max-w-4xl">
            <Countdown target={getEventStart(headlineEvent).toISOString()} />
          </div>
        </div>
      )}

      <AboutSection event={headlineEvent} />

      <EventsSection events={upcomingEvents} scrollToSection={scrollToSection} />

      <TicketsSection events={upcomingEvents} />

      <ContactSection />

      <Footer />
    </div>
  )
}
