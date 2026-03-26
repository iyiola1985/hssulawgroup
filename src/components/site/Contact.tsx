"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { easeSmooth } from "@/lib/motion";
import { MapPin } from "lucide-react";
import { ContactEmailBadge } from "@/components/site/ContactEmailBadge";
import { FIRM_CONTACT_EMAIL, FIRM_CONTACT_PHONE, telContactHref } from "@/lib/contact";

const addressLines = [
  "Angela W Hssu & Associates Immigration Law",
  "355 S Grand Ave, Suite 2450",
  "Los Angeles, CA 90071",
];

const mapsEmbedSrc =
  "https://www.google.com/maps?q=355+S+Grand+Ave,+Suite+2450,+Los+Angeles,+CA+90071&output=embed";

export function Contact() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: fd.get("name"),
      email: fd.get("email"),
      message: fd.get("message"),
      _honeypot: fd.get("website"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!res.ok) {
        setError(
          data.error ??
            "Something went wrong. Please try again or email us directly.",
        );
        setSubmitting(false);
        return;
      }

      setSent(true);
      form.reset();
    } catch {
      setError("Network error. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      id="contact"
      className="scroll-mt-24 bg-navy py-24 text-white sm:py-28"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: easeSmooth }}
          className="max-w-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Contact
          </p>
          <h2
            id="contact-heading"
            className="mt-4 font-serif text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Schedule a consultation
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/75 sm:text-lg">
            Share a brief summary of your matter, or write to us at{" "}
            <span className="font-medium text-gold/95">{FIRM_CONTACT_EMAIL}</span>
            . We will respond as soon as possible. Submitting this form does not
            create an attorney–client relationship.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: easeSmooth }}
            className="glass-dark rounded-sm p-8 sm:p-10"
          >
            <div className="flex gap-4">
              <MapPin
                className="mt-0.5 h-6 w-6 shrink-0 text-gold"
                strokeWidth={1.35}
                aria-hidden
              />
              <address className="not-italic text-sm leading-relaxed text-white/88 sm:text-base">
                {addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </div>

            <div className="mt-8">
              <ContactEmailBadge variant="dark" />
            </div>

            <div className="mt-8 overflow-hidden rounded-sm ring-1 ring-white/10">
              <iframe
                title="Office location: 355 S Grand Ave, Los Angeles"
                src={mapsEmbedSrc}
                className="h-[280px] w-full grayscale-[20%] contrast-[1.05] sm:h-[320px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              delay: 0.08,
              duration: 0.5,
              ease: easeSmooth,
            }}
          >
            {sent ? (
              <div className="glass-dark flex min-h-[320px] flex-col items-center justify-center rounded-sm p-10 text-center">
                <p className="font-serif text-xl text-white">
                  Thank you for reaching out.
                </p>
                <p className="mt-3 max-w-sm text-sm text-white/75">
                  Your message has been sent. We will reply as soon as we can.
                  For urgent matters, call{" "}
                  <a
                    href={telContactHref}
                    className="font-medium text-gold underline decoration-gold/40 underline-offset-2 hover:decoration-gold"
                  >
                    {FIRM_CONTACT_PHONE}
                  </a>{" "}
                  or email{" "}
                  <a
                    href={`mailto:${FIRM_CONTACT_EMAIL}`}
                    className="font-medium text-gold underline decoration-gold/40 underline-offset-2 hover:decoration-gold"
                  >
                    {FIRM_CONTACT_EMAIL}
                  </a>
                  .
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="relative glass-dark space-y-6 rounded-sm p-8 sm:p-10"
              >
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden
                  title="Do not fill"
                  className="absolute -left-[10000px] h-px w-px opacity-0"
                />

                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-semibold uppercase tracking-wider text-gold/90"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    disabled={submitting}
                    className="mt-2 w-full rounded-sm border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none ring-gold/40 transition-[box-shadow,border-color] focus:border-gold/50 focus:ring-2 disabled:opacity-50"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-semibold uppercase tracking-wider text-gold/90"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    disabled={submitting}
                    className="mt-2 w-full rounded-sm border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none ring-gold/40 transition-[box-shadow,border-color] focus:border-gold/50 focus:ring-2 disabled:opacity-50"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-semibold uppercase tracking-wider text-gold/90"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    disabled={submitting}
                    className="mt-2 w-full resize-y rounded-sm border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none ring-gold/40 transition-[box-shadow,border-color] focus:border-gold/50 focus:ring-2 disabled:opacity-50"
                    placeholder="Briefly describe your immigration matter…"
                  />
                </div>

                {error ? (
                  <p
                    role="alert"
                    className="text-sm font-medium text-red-300/95"
                  >
                    {error}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={submitting}
                  className="jq-glow w-full rounded-sm bg-gold py-4 text-sm font-semibold tracking-wide text-navy transition-transform hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-60"
                >
                  {submitting ? "Sending…" : "Send message"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
