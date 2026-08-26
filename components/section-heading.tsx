import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  /** Small signage label above the title. */
  plate: string
  title: React.ReactNode
  align?: "left" | "center"
  className?: string
}

export function SectionHeading({ plate, title, align = "left", className }: SectionHeadingProps) {
  return (
    <div className={cn(align === "center" && "flex flex-col items-center text-center", className)}>
      <span className="gk-plate">{plate}</span>
      <h2 className="gk-display mt-5 text-[clamp(3rem,10vw,7.5rem)] text-gk-kalk">{title}</h2>
      <div
        className={cn(
          "mt-6 h-px w-full max-w-[9rem] bg-gk-oranje",
          align === "center" && "mx-auto",
        )}
      />
    </div>
  )
}

/** Full-bleed hazard tape used to separate the major zones of the page. */
export function HazardRule({ animated = false }: { animated?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={cn("gk-hazard h-2 w-full opacity-80", animated && "animate-gk-hazard-pan")}
    />
  )
}
