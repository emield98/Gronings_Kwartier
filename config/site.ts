// Site configuration
export const siteConfig = {
  name: "Gronings Kwartier",
  description: "A community-driven electronic music festival in Groningen",
  url: "https://groningskwartier.nl",
  ogImage: "/placeholder.jpg",
  links: {
    instagram: "https://www.instagram.com/groningskwartier",
    email: "info@gronings-kwartier.nl"
  },
  navigation: ["home", "about", "events", "tickets", "contact"] as const
}

export type NavigationSection = typeof siteConfig.navigation[number]
