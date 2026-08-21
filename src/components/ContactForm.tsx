import { Mail } from "lucide-react";
import { Eyebrow } from "./Eyebrow";
import { site } from "@/lib/site";

const topics = [
  "I have a story to share",
  "I want to volunteer",
  "I want to support a story",
  "Press or partnership",
  "Something else",
];

const field =
  "mt-2.5 w-full rounded-lg border border-rule bg-white px-4 py-3 text-[0.9375rem] text-ink transition-colors placeholder:text-faint focus:border-ink focus:outline-none";

/**
 * Frontend-only. With NEXT_PUBLIC_FORMSPREE_ID set, the form posts natively to
 * Formspree and needs no client JavaScript. Without it we show a direct
 * contact panel rather than a form that silently goes nowhere.
 */
export function ContactForm() {
  if (!site.formspreeId) {
    return (
      <div className="border border-rule bg-white p-8 shadow-lift sm:p-10">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-paper">
          <Mail className="h-5 w-5" aria-hidden />
        </span>
        <h2 className="mt-6 text-[1.75rem] leading-tight">
          Write to us directly
        </h2>
        {site.email ? (
          <>
            <p className="mt-4 max-w-md leading-relaxed text-muted">
              Tell us who you are, where you are writing from, and what you
              would like to talk about. Someone on the team will reply.
            </p>
            <a
              href={`mailto:${site.email}?subject=${encodeURIComponent("Hello Lofa24")}`}
              className="mt-7 inline-block font-display text-[clamp(1.375rem,3vw,2rem)] font-bold tracking-[-0.03em] underline decoration-red/50 underline-offset-8 transition-colors hover:text-red"
            >
              {site.email}
            </a>
          </>
        ) : (
          <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-muted">
            The contact form is not connected yet. Set{" "}
            <code className="rounded bg-paper px-1.5 py-0.5 text-[0.8125rem] text-ink">
              NEXT_PUBLIC_FORMSPREE_ID
            </code>{" "}
            to enable it, or{" "}
            <code className="rounded bg-paper px-1.5 py-0.5 text-[0.8125rem] text-ink">
              NEXT_PUBLIC_CONTACT_EMAIL
            </code>{" "}
            to show a direct email address here.
          </p>
        )}
      </div>
    );
  }

  return (
    <form
      action={`https://formspree.io/f/${site.formspreeId}`}
      method="POST"
      className="border border-rule bg-white p-8 shadow-lift sm:p-10"
    >
      <Eyebrow>Send a message</Eyebrow>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-semibold text-ink">
            Your name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={field}
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-semibold text-ink">
            Email or phone
          </label>
          <input
            id="email"
            name="email"
            type="text"
            required
            autoComplete="email"
            className={field}
          />
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor="topic" className="text-sm font-semibold text-ink">
          What is this about?
        </label>
        <select
          id="topic"
          name="topic"
          defaultValue={topics[0]}
          className={field}
        >
          {topics.map((topic) => (
            <option key={topic}>{topic}</option>
          ))}
        </select>
      </div>

      <div className="mt-6">
        <label htmlFor="message" className="text-sm font-semibold text-ink">
          Your message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Tell us what is happening, or what you would like to do."
          className={`${field} resize-y`}
        />
      </div>

      <button
        type="submit"
        className="group mt-8 inline-flex items-center gap-2.5 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-ink-soft"
      >
        Send message
        <span
          aria-hidden
          className="transition-transform duration-300 group-hover:translate-x-1"
        >
          &rarr;
        </span>
      </button>

      <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">
        We read everything that comes in. If your message is about a story you
        would rather keep private, say so and we will treat it that way.
      </p>
    </form>
  );
}
