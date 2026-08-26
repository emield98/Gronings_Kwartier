"use client"

import { useRef, useState } from "react"
import { Instagram, Mail, ArrowRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { siteConfig } from "@/config/site"
import { useLanguage } from "@/components/language-provider"
import { SectionHeading } from "@/components/section-heading"
import Reveal from "@/components/reveal"

const FIELD_CLASS =
  "w-full border border-gk-staal bg-gk-beton px-4 py-3 text-sm text-gk-kalk placeholder:text-gk-staal transition-colors focus:border-gk-oranje focus:outline-none"

const LABEL_CLASS =
  "block font-mono text-[0.6rem] uppercase tracking-plate text-gk-rook"

export default function ContactSection() {
  const { toast } = useToast()
  const { t } = useLanguage()
  const formRef = useRef<HTMLFormElement>(null)
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)

    const name = formData.get("name") as string
    formData.set("_subject", t("contact.subject", { name }))

    setSending(true)
    try {
      const res = await fetch("https://formsubmit.co/ajax/groningskwartierevents@gmail.com", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      })

      if (res.ok) {
        toast({
          title: t("contact.toast.sent.title"),
          description: t("contact.toast.sent.body"),
        })
        form.reset()
      } else {
        toast({
          title: t("contact.toast.error.title"),
          description: t("contact.toast.error.body"),
          variant: "destructive",
        })
      }
    } catch (err) {
      toast({
        title: t("contact.toast.network.title"),
        description: t("contact.toast.network.body"),
        variant: "destructive",
      })
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="gk-grain relative overflow-hidden bg-gk-beton py-24 md:py-32">
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <Reveal>
          <SectionHeading plate={t("contact.plate")} title={t("contact.title")} />
        </Reveal>

        <div className="mt-14 grid gap-14 md:grid-cols-12 md:gap-16">
          <Reveal delay={80} className="md:col-span-7">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="box" />

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className={LABEL_CLASS}>
                    {t("contact.form.name")}
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    required
                    autoComplete="name"
                    className={`${FIELD_CLASS} mt-2`}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className={LABEL_CLASS}>
                    {t("contact.form.email")}
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className={`${FIELD_CLASS} mt-2`}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className={LABEL_CLASS}>
                  {t("contact.form.message")}
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={8}
                  required
                  className={`${FIELD_CLASS} mt-2 resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="group inline-flex items-center gap-3 bg-gk-oranje px-7 py-4 font-mono text-xs font-bold uppercase tracking-plate text-gk-ink transition-colors hover:bg-gk-kalk disabled:cursor-not-allowed disabled:opacity-60"
              >
                {t("contact.form.send")}
                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </form>
          </Reveal>

          <Reveal delay={160} className="md:col-span-5">
            <div className="border border-gk-staal">
              <div className="border-b border-gk-staal p-6">
                <h3 className="gk-display text-2xl text-gk-kalk">
                  {t("contact.getInTouch.title")}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gk-rook">
                  {t("contact.getInTouch.body")}
                </p>
                <a
                  href={`mailto:${siteConfig.links.email}`}
                  className="mt-5 inline-flex items-center gap-2.5 font-mono text-sm text-gk-oranje transition-colors hover:text-gk-kalk"
                >
                  <Mail size={15} />
                  {siteConfig.links.email}
                </a>
              </div>

              <div className="p-6">
                <span className={LABEL_CLASS}>{t("contact.followUs.title")}</span>
                <a
                  href={siteConfig.links.instagram}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={t("nav.instagram")}
                  className="mt-3 inline-flex h-11 w-11 items-center justify-center border border-gk-staal text-gk-kalk transition-colors hover:border-gk-oranje hover:text-gk-oranje"
                >
                  <Instagram size={18} />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
