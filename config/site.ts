// Site configuration
export const siteConfig = {
  name: "Gronings Kwartier",
  description: "A community-driven electronic music festival in Groningen",
  url: "https://gronings-kwartier.nl",
  ogImage: "/logo.png",
  links: {
    instagram: "https://www.instagram.com/groningskwartier",
    email: "info@gronings-kwartier.nl"
  },
  // Gronings Kwartier has no permanent home — the venue belongs to the
  // edition, not to the festival. It lives on each Event in lib/events.ts.
  city: "Groningen",
  navigation: ["home", "about", "events", "tickets", "contact"] as const
}

export type NavigationSection = typeof siteConfig.navigation[number]
