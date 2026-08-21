import type { Metadata } from "next";
import Image from "next/image";
import { Mic } from "lucide-react";
import { ButtonLink, TextLink } from "@/components/Button";
import { Chip } from "@/components/Chip";
import { Container } from "@/components/Container";
import { Eyebrow } from "@/components/Eyebrow";
import { SectionHead } from "@/components/SectionHead";
import { getTeam } from "@/lib/content";

export const metadata: Metadata = {
  title: "Podcast",
  description:
    "Long-form conversations from Lofa County — young people, local leaders, and the questions the community is actually asking.",
};

const strands = [
  {
    title: "Community conversations",
    body: "Residents and local leaders in the same conversation, on the issues people raised with us that month.",
  },
  {
    title: "Young voices",
    body: "Extended interviews with young people in Lofa about work, school, and what they are being asked to accept.",
  },
  {
    title: "Ideas and inquiry",
    body: "Philosophy, justice, and rational thought applied to questions Lofa is living through.",
  },
];

export default function PodcastPage() {
  const host = getTeam().find((member) => member.role === "Podcast Director");

  return (
    <>
      <Container className="pt-14 pb-16 sm:pt-20">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-3">
            <Eyebrow>Lofa24 Podcast</Eyebrow>
            <Chip tone="red">In production</Chip>
          </div>
          <h1 className="mt-6 text-[clamp(2.5rem,6.5vw,4.5rem)] leading-[0.98]">
            Conversations, at the length they deserve
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            A story can be told in a photograph and four paragraphs. An argument
            cannot. The podcast is where Lofa24 sits with a question long enough
            to get somewhere.
          </p>
        </div>
      </Container>

      {/* An honest empty state rather than a fabricated feed. */}
      <Container className="pb-20">
        <div className="border border-rule bg-paper p-10 text-center sm:p-16">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lift">
            <Mic className="h-5 w-5" aria-hidden />
          </span>
          <h2 className="mx-auto mt-7 max-w-xl text-[clamp(1.75rem,3.4vw,2.5rem)]">
            The first episodes are in production
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-muted">
            We are recording in Voinjama now. When episodes are published they
            will appear here with full show notes. If you would like to be told
            when the first one lands &mdash; or you have something you think we
            should be asking about &mdash; write to us.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <ButtonLink href="/contact" variant="solid">
              Tell us when it launches
            </ButtonLink>
            <TextLink href="/stories">Read the stories meanwhile</TextLink>
          </div>
        </div>
      </Container>

      <section className="border-t border-rule">
        <Container className="py-20 sm:py-24">
          <SectionHead eyebrow="What to expect" title="Three strands" />
          <ol className="mt-14 grid gap-8 sm:grid-cols-3">
            {strands.map((strand, index) => (
              <li key={strand.title} className="border-t-2 border-ink pt-6">
                <span className="numeral">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-[1.5rem] leading-tight">
                  {strand.title}
                </h3>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">
                  {strand.body}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {host ? (
        <section className="border-t border-rule bg-paper">
          <Container className="py-20 sm:py-24">
            <div className="grid items-center gap-10 sm:grid-cols-[minmax(0,16rem)_1fr] sm:gap-14">
              <div className="relative aspect-[4/5] w-full max-w-xs overflow-hidden bg-white shadow-lift">
                <Image
                  src={host.photo.src}
                  alt={host.photo.alt}
                  fill
                  sizes="(min-width: 640px) 16rem, 100vw"
                  className="object-cover object-top"
                />
              </div>
              <div>
                <Eyebrow>Hosted by</Eyebrow>
                <h2 className="mt-5 text-[clamp(2rem,4.5vw,3rem)]">
                  {host.name}
                </h2>
                <p className="mt-6 max-w-2xl text-[1.0625rem] leading-[1.8] text-ink">
                  {host.bio}
                </p>
              </div>
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
