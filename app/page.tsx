"use client"

import { getUpcomingEvents } from "@/lib/events"
import { useActiveSection, scrollToSection } from "@/hooks/use-navigation"
import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"
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

      <AboutSection />

      <EventsSection events={upcomingEvents} scrollToSection={scrollToSection} />

      <TicketsSection events={upcomingEvents} />

      <ContactSection />

      <Footer />
    </div>
  )
}
