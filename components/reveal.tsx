"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface RevealProps {
  children: React.ReactNode
  /** Stagger in milliseconds, applied as a transition delay. */
  delay?: number
  /**
   * "fade" lifts the block a little. "mask" clips to the element's own box
   * and slides the content up from behind it — for display type.
   */
  variant?: "fade" | "mask"
  className?: string
}

/**
 * Reveals its children once they scroll into view. The reduced-motion media
 * query in globals.css neutralises the transform, so nothing is hidden from
 * readers who opt out of motion.
 */
export default function Reveal({
  children,
  delay = 0,
  variant = "fade",
  className,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Reveal on entry, but also whenever the element is already above the
          // viewport: a fast scroll or a deep link can carry it past without a
          // single intersecting frame, which would strand it at opacity 0.
          if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
            setVisible(true)
            observer.disconnect()
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  if (variant === "mask") {
    return (
      <div ref={ref} data-visible={visible} className={cn("gk-mask", className)}>
        <span
          className="gk-mask-inner"
          style={delay ? { transitionDelay: `${delay}ms` } : undefined}
        >
          {children}
        </span>
      </div>
    )
  }

  return (
    <div
      ref={ref}
      data-visible={visible}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn("gk-reveal", className)}
    >
      {children}
    </div>
  )
}
