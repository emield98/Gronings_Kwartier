import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Suikerfabriek palette — raw concrete, cold steel, safety orange.
        gk: {
          ink: "rgb(var(--gk-ink) / <alpha-value>)",
          beton: "rgb(var(--gk-beton) / <alpha-value>)",
          staal: "rgb(var(--gk-staal) / <alpha-value>)",
          rook: "rgb(var(--gk-rook) / <alpha-value>)",
          kalk: "rgb(var(--gk-kalk) / <alpha-value>)",
          oranje: "rgb(var(--gk-oranje) / <alpha-value>)",
          geel: "rgb(var(--gk-geel) / <alpha-value>)",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      fontFamily: {
        display: ["var(--font-display)", "Haettenschweiler", "Impact", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      letterSpacing: {
        plate: "0.24em",
        stencil: "0.32em",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "gk-hazard-pan": {
          from: { backgroundPosition: "0 0" },
          to: { backgroundPosition: "56px 0" },
        },
        "gk-led": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.35", transform: "scale(0.82)" },
        },
        "gk-drop": {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "12%, 78%": { opacity: "1" },
          "100%": { transform: "translateY(400%)", opacity: "0" },
        },
        "gk-plate-in": {
          from: { opacity: "0", transform: "translateY(1.25rem)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "gk-hazard-pan": "gk-hazard-pan 3s linear infinite",
        "gk-led": "gk-led 2s ease-in-out infinite",
        "gk-drop": "gk-drop 3.4s cubic-bezier(0.55, 0, 0.45, 1) infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
