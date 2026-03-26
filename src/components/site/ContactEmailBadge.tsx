"use client";

import { useState } from "react";
import { Check, Mail, Phone } from "lucide-react";
import {
  FIRM_CONTACT_EMAIL,
  FIRM_CONTACT_PHONE,
  mailtoContactHref,
  telContactHref,
} from "@/lib/contact";

type Props = {
  variant?: "dark" | "footer";
};

export function ContactEmailBadge({ variant = "dark" }: Props) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(FIRM_CONTACT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  const isFooter = variant === "footer";

  return (
    <div
      className={
        isFooter
          ? "mt-6 rounded-sm border border-white/12 bg-white/[0.04] p-4"
          : "rounded-sm border border-gold/35 bg-white/[0.06] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
      }
    >
      <p
        className={
          isFooter
            ? "text-xs font-semibold uppercase tracking-wider text-gold/85"
            : "text-xs font-semibold uppercase tracking-[0.2em] text-gold"
        }
      >
        Enquiries
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <a
          href={mailtoContactHref}
          className="group inline-flex items-center gap-2.5 text-sm font-medium text-white transition-colors hover:text-gold sm:text-base"
        >
          <span
            className={
              isFooter
                ? "flex h-9 w-9 items-center justify-center rounded-sm bg-gold/15 text-gold"
                : "flex h-10 w-10 items-center justify-center rounded-sm bg-gold/20 text-gold transition-colors group-hover:bg-gold/30"
            }
            aria-hidden
          >
            <Mail className="h-4 w-4" strokeWidth={1.5} />
          </span>
          <span className="break-all underline decoration-gold/40 underline-offset-4 transition-[text-decoration-color] group-hover:decoration-gold">
            {FIRM_CONTACT_EMAIL}
          </span>
        </a>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <a
          href={telContactHref}
          className="group inline-flex items-center gap-2.5 text-sm font-medium text-white transition-colors hover:text-gold sm:text-base"
        >
          <span
            className={
              isFooter
                ? "flex h-9 w-9 items-center justify-center rounded-sm bg-gold/15 text-gold"
                : "flex h-10 w-10 items-center justify-center rounded-sm bg-gold/20 text-gold transition-colors group-hover:bg-gold/30"
            }
            aria-hidden
          >
            <Phone className="h-4 w-4" strokeWidth={1.5} />
          </span>
          <span className="underline decoration-gold/40 underline-offset-4 transition-[text-decoration-color] group-hover:decoration-gold">
            {FIRM_CONTACT_PHONE}
          </span>
        </a>
      </div>
      {!isFooter && (
        <button
          type="button"
          onClick={copy}
          className="mt-4 text-xs font-semibold uppercase tracking-wider text-white/55 transition-colors hover:text-gold"
        >
          {copied ? (
            <span className="inline-flex items-center gap-1.5 text-gold">
              <Check className="h-3.5 w-3.5" aria-hidden />
              Copied
            </span>
          ) : (
            "Copy email address"
          )}
        </button>
      )}
    </div>
  );
}
