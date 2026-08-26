"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

/** Face geometry, in user units of the 240x380 viewBox. */
const CX = 120
const CY = 236
const FACE_R = 58
const ARC_R = 46
const ARC_C = 2 * Math.PI * ARC_R
/** A stroke as wide as the radius, laid on a circle of half that radius,
    fills from the centre out — so the same dash trick draws a wedge. */
const PIE_R = ARC_R / 2
const PIE_C = 2 * Math.PI * PIE_R

/** An arched opening: springs from a half-circle, then drops straight. */
function arch(x: number, y: number, w: number, h: number) {
  const r = w / 2
  return `M${x} ${y + r} a${r} ${r} 0 0 1 ${w} 0 V${y + h} H${x} Z`
}

const TICKS = Array.from({ length: 12 }, (_, i) => {
  const angle = (i * Math.PI) / 6
  const long = i % 3 === 0
  const outer = FACE_R - 7
  const inner = outer - (long ? 11 : 6)
  return {
    key: i,
    x1: CX + Math.sin(angle) * inner,
    y1: CY - Math.cos(angle) * inner,
    x2: CX + Math.sin(angle) * outer,
    y2: CY - Math.cos(angle) * outer,
    long,
  }
})

interface MartiniClockProps {
  className?: string
}

/**
 * The Martinitoren with the quarter running on its face: the hand takes the
 * fifteen minutes it is given, holds on the quarter, then lets go and runs
 * the rest of the night while the tower lights up behind it.
 *
 * The cycle only runs while the tower is on screen.
 */
export default function MartiniClock({ className }: MartiniClockProps) {
  const ref = useRef<SVGSVGElement>(null)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (typeof IntersectionObserver === "undefined") {
      setRunning(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) setRunning(entry.isIntersecting)
      },
      { threshold: 0.15 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <svg
      ref={ref}
      viewBox="0 0 240 380"
      aria-hidden="true"
      focusable="false"
      data-run={running}
      className={cn("gk-clock block", className)}
    >
      <defs>
        <radialGradient id="gk-clock-glow">
          <stop offset="0%" stopColor="rgb(var(--gk-oranje) / 0.55)" />
          <stop offset="55%" stopColor="rgb(var(--gk-oranje) / 0.16)" />
          <stop offset="100%" stopColor="rgb(var(--gk-oranje) / 0)" />
        </radialGradient>
      </defs>

      {/* Night glow behind the face, up once the quarter is spent */}
      <circle
        className="gk-clock-glow"
        cx={CX}
        cy={CY}
        r={110}
        fill="url(#gk-clock-glow)"
      />

      {/* Finial and spire */}
      <rect x="118.5" y="2" width="3" height="18" className="fill-gk-kalk" />
      <circle cx="120" cy="9" r="4.5" className="fill-gk-geel" />
      <polygon points="66,118 120,16 174,118" className="fill-gk-kalk" />
      <polygon points="120,16 174,118 120,118" className="fill-gk-rook" opacity="0.55" />

      {/* Lantern */}
      <path d="M74 118 H166 L162 168 H78 Z" className="fill-gk-kalk" />
      <path d={arch(92, 129, 13, 28)} className="gk-window fill-gk-geel/85" />
      <path d={arch(113.5, 127, 13, 30)} className="gk-window fill-gk-geel/85" />
      <path d={arch(135, 129, 13, 28)} className="gk-window fill-gk-geel/85" />

      {/* Cornice and body, running off the bottom edge */}
      <rect x="66" y="168" width="108" height="11" className="fill-gk-kalk" />
      <rect x="72" y="179" width="96" height="201" className="fill-gk-kalk" />
      <rect x="72" y="300" width="96" height="4" className="fill-gk-rook" opacity="0.5" />
      <path d={arch(89, 322, 18, 44)} className="gk-window fill-gk-geel/85" />
      <path d={arch(133, 322, 18, 44)} className="gk-window fill-gk-geel/85" />

      {/* The face, wider than the tower it is bolted to */}
      <circle cx={CX} cy={CY} r={FACE_R} className="fill-gk-ink stroke-gk-kalk" strokeWidth="5" />
      <circle cx={CX} cy={CY} r={FACE_R - 12} className="stroke-gk-staal" strokeWidth="1.5" fill="none" />

      {/* The quarter itself, filled and then rimmed as the hand walks it */}
      <circle
        className="gk-clock-arc"
        cx={CX}
        cy={CY}
        r={PIE_R}
        fill="none"
        stroke="rgb(var(--gk-oranje) / 0.3)"
        strokeWidth={ARC_R}
        transform={`rotate(-90 ${CX} ${CY})`}
        style={{ ["--gk-arc" as string]: PIE_C.toFixed(2) }}
      />

      {TICKS.map((tick) => (
        <line
          key={tick.key}
          x1={tick.x1}
          y1={tick.y1}
          x2={tick.x2}
          y2={tick.y2}
          className={tick.long ? "stroke-gk-kalk" : "stroke-gk-rook"}
          strokeWidth={tick.long ? 3.5 : 2}
          strokeLinecap="square"
        />
      ))}

      <circle
        className="gk-clock-arc"
        cx={CX}
        cy={CY}
        r={ARC_R}
        fill="none"
        stroke="rgb(var(--gk-oranje))"
        strokeWidth="9"
        transform={`rotate(-90 ${CX} ${CY})`}
        style={{ ["--gk-arc" as string]: ARC_C.toFixed(2) }}
      />

      {/* Hour hand stays put; nothing about the night is on the hour */}
      <line
        x1={CX}
        y1={CY}
        x2={CX}
        y2={CY - 26}
        className="stroke-gk-kalk"
        strokeWidth="7"
        strokeLinecap="round"
      />

      <g className="gk-clock-hand">
        <line
          x1={CX}
          y1={CY + 10}
          x2={CX}
          y2={CY - ARC_R - 2}
          stroke="rgb(var(--gk-oranje))"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </g>

      <circle cx={CX} cy={CY} r="6.5" fill="rgb(var(--gk-oranje))" />
      <circle cx={CX} cy={CY} r="2.5" className="fill-gk-ink" />
    </svg>
  )
}
