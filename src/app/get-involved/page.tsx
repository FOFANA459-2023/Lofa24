import type { Metadata } from "next";
import { HandHeart, Megaphone, Users } from "lucide-react";
import { ButtonLink } from "@/components/Button";
import { Container } from "@/components/Container";
import { Eyebrow } from "@/components/Eyebrow";

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "Share a story from your community, volunteer with the Lofa24 team, or partner with us to support the people we report on.",
};

const paths = [
  {
    icon: Megaphone,
    audience: "For anyone in Lofa",
    title: "Share your story",
    body: "If something is happening where you live — good or bad — and nobody is reporting it, tell us. You do not need to be a public figure and you do not need proof ready. A conversation is enough to start.",
    points: [
      "Reach us in Voinjama or send a message",
      "We come to you, not the other way around",
      "You decide how much of your name appears",
    ],
    cta: "Tell us what's happening",
  },
  {
    icon: Users,
    audience: "For young people",
    title: "Volunteer with the team",
    body: "Lofa24 is youth-led and runs on volunteers. If you want to learn reporting, camera work, editing, audio, or design, we will train you on real assignments rather than in a classroom.",
    points: [
      "Field reporting and interviewing",
      "Video, photography, and editing",
      "Podcast production and research",
    ],
    cta: "Volunteer with us",
  },
  {
    icon: HandHeart,
    audience: "For supporters",
    title: "Partner with us",
    body: "The rice, the bedsheets, the baby food, the booth repairs — all of it came from individuals who read a story and asked what was needed. Several asked to remain anonymous. We are happy to do the same for you.",
    points: [
      "Support a specific family or story",
      "Fund equipment for the field team",
      "Back the podcast or a reporting series",
    ],
    cta: "Start a conversation",
  },
];

export default function GetInvolvedPage() {
  return (
    <>
      <Container className="pt-14 pb-16 sm:pt-20">
        <div className="max-w-3xl">
          <Eyebrow>Take part</Eyebrow>
          <h1 className="mt-6 text-[clamp(2.5rem,6.5vw,4.5rem)] leading-[0.98]">
            Three ways in
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Lofa24 only works because people in the county bring us things, and
            because people outside it respond. Both of those are open to you.
          </p>
        </div>
      </Container>

      <Container className="pb-20">
        <ol className="grid gap-6 lg:grid-cols-3">
          {paths.map((path, index) => (
            <li
              key={path.title}
              className="flex flex-col border border-rule bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-paper">
                  <path.icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="numeral">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <p className="eyebrow mt-7">{path.audience}</p>
              <h2 className="mt-3 text-[1.75rem] leading-tight">
                {path.title}
              </h2>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">
                {path.body}
              </p>

              <ul className="mt-7 flex-1 space-y-3 border-t border-rule pt-6 text-sm text-muted">
                {path.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span
                      aria-hidden
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red"
                    />
                    {point}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <ButtonLink
                  href="/contact"
                  variant="outline"
                  className="w-full"
                >
                  {path.cta}
                </ButtonLink>
              </div>
            </li>
          ))}
        </ol>
      </Container>

      <section className="border-t border-rule bg-paper">
        <Container className="py-16 sm:py-20">
          <div className="max-w-3xl">
            <Eyebrow>A note on money</Eyebrow>
            <p className="mt-6 text-[1.0625rem] leading-[1.8] text-ink">
              Lofa24 does not collect payments through this website. Support is
              arranged directly with our team so that we can tell you precisely
              what is needed, who receives it, and what it changed.{" "}
              <span className="accent text-[1.1875rem]">
                If you would rather give equipment, supplies, or time instead of
                funds, that is often more useful.
              </span>
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
