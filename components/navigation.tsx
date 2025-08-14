"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Instagram } from "lucide-react"
import { siteConfig, NavigationSection } from "@/config/site"

interface NavigationProps {
  activeSection: string
  scrollToSection: (sectionId: string) => void
}

export default function Navigation({ activeSection, scrollToSection }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleScrollToSection = (sectionId: string) => {
    scrollToSection(sectionId)
    setIsMenuOpen(false)
  }

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center flex-1">
              <a href="/" aria-label="Home">
              <img
                src="/logo.png"
                alt="GK Logo"
                className="object-contain h-12 w-auto max-h-16"
                style={{ maxWidth: "100%" }}
              />
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <div className="flex space-x-8">
                {siteConfig.navigation.map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`text-sm uppercase tracking-wider transition-colors hover:text-cyan-400 ${
                      activeSection === section ? "text-cyan-400" : "text-gray-300"
                    }`}
                  >
                    {section}
                  </button>
                ))}
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-300 hover:text-cyan-400 hover:bg-transparent border border-gray-700 hover:border-cyan-400 transition-colors"
                onClick={() => window.open(siteConfig.links.instagram, '_blank')}
              >
                <Instagram size={20} />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden relative z-[60] text-white" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      {isMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 z-[55] bg-black/95 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        >
          <div className="flex flex-col items-center justify-center min-h-screen px-6 py-20">
            {/* Close button at top right */}
            <button
              className="absolute top-6 right-6 text-white hover:text-cyan-400 transition-colors z-[56]"
              onClick={() => setIsMenuOpen(false)}
            >
              <X size={28} />
            </button>

            <div 
              className="flex flex-col items-center space-y-8 w-full max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              {siteConfig.navigation.map((section, index) => (
                <button
                  key={section}
                  onClick={() => handleScrollToSection(section)}
                  className={`text-2xl uppercase tracking-wider transition-colors hover:text-cyan-400 text-center ${
                    activeSection === section ? "text-cyan-400" : "text-white"
                  }`}
                  style={{ 
                    animationDelay: `${index * 100}ms`,
                    animation: 'fadeInUp 0.5s ease-out forwards'
                  }}
                >
                  {section}
                </button>
              ))}
              
              <div className="mt-8 pt-8 border-t border-gray-700">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-cyan-400 hover:bg-transparent border border-gray-700 hover:border-cyan-400 transition-colors"
                  onClick={() => {
                    window.open(siteConfig.links.instagram, '_blank')
                    setIsMenuOpen(false)
                  }}
                >
                  <Instagram size={24} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  )
}