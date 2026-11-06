import { ButtonLink, TextLink } from "./Button";
import { Container } from "./Container";
import { Eyebrow } from "./Eyebrow";

/**
 * Routes to /contact rather than a payment provider — Lofa24 does not process
 * donations on this site, support is arranged person to person.
 */
export function SupportSection() {
  return (
    <section className="bg-canopy text-white">
      <Container className="py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.55fr_1fr] lg:items-end">
          <div className="max-w-3xl">
            <Eyebrow tone="light">Support a story</Eyebrow>
            <h2 className="mt-5 text-[clamp(1.9rem,4.2vw,3.1rem)] text-white">
              Rice, bedsheets, baby food, a repaired shopfront. Each one arrived
              because somebody read a story and asked{" "}
              <span className="accent text-gold">what was needed</span>.
            </h2>
            <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-white/70">
              Several of those people asked to remain anonymous. We do not
              collect payments on this website — get in touch and we will tell
              you exactly what is needed, who receives it, and what it changed.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 lg:justify-end">
            <ButtonLink href="/contact" variant="light">
              Partner with us
            </ButtonLink>
            <TextLink href="/get-involved" className="text-white">
              Other ways to take part
            </TextLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
