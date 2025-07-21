# Gronings Kwartier Festival Website

A modern, responsive website for the Gronings Kwartier electronic music festival built with Next.js 15, TypeScript, and Tailwind CSS.

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main page component (refactored)
│   └── globals.css         # Global styles
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── navigation.tsx      # Navigation component with mobile menu
│   ├── hero-section.tsx    # Hero section with video background
│   ├── about-section.tsx   # About section
│   ├── events-section.tsx  # Events display with cards
│   ├── tickets-section.tsx # Ticket purchasing section
│   ├── contact-section.tsx # Contact form and info
│   └── footer.tsx          # Site footer
├── config/
│   └── site.ts            # Site configuration and constants
├── hooks/
│   └── use-navigation.ts  # Navigation utilities and active section detection
├── lib/
│   ├── events.ts          # Centralized event data management
│   └── utils.ts           # Utility functions
└── public/
    ├── header.mp4         # Hero video background
    └── ...                # Other static assets
```

## Features

- **Professional Architecture**: Modular component structure with separation of concerns
- **Responsive Design**: Mobile-first approach with professional mobile navigation
- **Type Safety**: Full TypeScript implementation with proper interfaces
- **Centralized Data**: Event management through `lib/events.ts`
- **Configuration**: Site-wide settings in `config/site.ts`
- **Custom Hooks**: Reusable navigation logic
- **Modern UI**: shadcn/ui components with Tailwind CSS
- **Video Background**: Autoplay video on hero section
- **Social Integration**: Instagram links and metadata

## Key Components

### Navigation (`components/navigation.tsx`)
- Responsive navigation with mobile menu
- Active section highlighting
- Instagram integration
- Smooth scrolling

### Hero Section (`components/hero-section.tsx`)
- Video background with fallback
- Animated title with gradient text
- Call-to-action button

### Events Section (`components/events-section.tsx`)
- Professional event cards
- Event status indicators
- Responsive design
- Integration with centralized event data

### Tickets Section (`components/tickets-section.tsx`)
- Interactive ticket cards
- Direct links to ticket purchasing
- Animated background effects

## Data Management

### Events (`lib/events.ts`)
- Centralized event data with TypeScript interfaces
- Helper functions for filtering upcoming events
- Easy to maintain and update

### Site Configuration (`config/site.ts`)
- Centralized site settings
- Navigation configuration
- Social media links
- SEO metadata

## Development

The site is built with modern development practices:
- Component-based architecture
- TypeScript for type safety
- Tailwind CSS for styling
- Custom hooks for state management
- Professional mobile UX

## Mobile Experience

The mobile navigation provides:
- Full-screen overlay
- Centered navigation items
- Easy-to-tap buttons
- Instagram access
- Smooth animations

## Maintenance

To update events: Edit `lib/events.ts`
To modify site settings: Edit `config/site.ts`
To customize components: Each section is isolated in its own component file

This professional structure makes the codebase maintainable, scalable, and easy to extend.
