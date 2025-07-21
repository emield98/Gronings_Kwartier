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

  return (
    <div className="bg-black text-white overflow-x-hidden">
      <Navigation 
        activeSection={activeSection} 
        scrollToSection={scrollToSection} 
      />
      
      <HeroSection scrollToSection={scrollToSection} />
      
      <AboutSection />
      
      <EventsSection 
        events={upcomingEvents} 
        scrollToSection={scrollToSection} 
      />
      
      <TicketsSection events={upcomingEvents} />
      
      <ContactSection />
      
      <Footer />

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
