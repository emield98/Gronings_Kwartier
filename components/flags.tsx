import type { Language } from "@/lib/i18n/config"

/**
 * Flags are drawn at the official 2:3 ratio on a 9×6 viewBox.
 * They are decorative here — the button that holds them carries the label.
 */

// Provincial flag of Groningen: a white cross (1/3 of the height) carrying a
// green cross (1/9 of the height); upper-hoist and lower-fly quarters red,
// the other two blue. Pantone 355 / 032 / 300.
function GroningenFlag(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 9 6" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="9" height="6" fill="#FFFFFF" />
      <rect x="0" y="0" width="3.5" height="2" fill="#EF3340" />
      <rect x="5.5" y="0" width="3.5" height="2" fill="#005EB8" />
      <rect x="0" y="4" width="3.5" height="2" fill="#005EB8" />
      <rect x="5.5" y="4" width="3.5" height="2" fill="#EF3340" />
      <rect x="4.16667" y="0" width="0.66667" height="6" fill="#009639" />
      <rect x="0" y="2.66667" width="9" height="0.66667" fill="#009639" />
    </svg>
  )
}

// Flag of the Netherlands.
function NetherlandsFlag(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 9 6" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="9" height="2" fill="#AE1C28" />
      <rect y="2" width="9" height="2" fill="#FFFFFF" />
      <rect y="4" width="9" height="2" fill="#21468B" />
    </svg>
  )
}

export const languageFlags: Record<
  Language,
  (props: React.SVGProps<SVGSVGElement>) => React.ReactElement
> = {
  gos: GroningenFlag,
  nl: NetherlandsFlag,
}
