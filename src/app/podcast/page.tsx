import type { Metadata } from "next";
import Image from "next/image";
import { Mic } from "lucide-react";
import { ButtonLink, TextLink } from "@/components/Button";
import { Chip } from "@/components/Chip";
import { Container } from "@/components/Container";
import { Eyebrow } from "@/components/Eyebrow";
import { PageHero } from "@/components/PageHero";
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
      <PageHero
        eyebrow="Lofa24 Podcast"
        title="Conversations, at the length they deserve"
        description="A story can be told in a photograph and four paragraphs. An argument cannot. The podcast is where Lofa24 sits with a question long enough to get somewhere."
        kicker={
          <div className="mb-5">
            <Chip tone="gold">In production</Chip>
          </div>
        }
      />

      <Container className="py-14 sm:py-16">
        <div className="rounded-[1.6rem] bg-white px-8 py-12 text-center shadow-card sm:px-16 sm:py-16">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-lg bg-paper">
            <Mic className="h-5 w-5" aria-hidden />
          </span>
          <h2 className="mx-auto mt-7 max-w-xl text-[clamp(1.7rem,3.2vw,2.4rem)]">
            The first episodes are in production
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-muted">
            We are recording in Voinjama now. When episodes are published they
            will appear here with full show notes. If you would like to be told
            when the first one lands — or you have something you think we
            should be asking about — write to us.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <ButtonLink href="/contact" variant="solid">
              Tell us when it launches
            </ButtonLink>
            <TextLink href="/stories">Read the stories meanwhile</TextLink>
          </div>
        </div>
      </Container>

      <section className="bg-paper">
        <Container className="py-16 sm:py-20">
          <SectionHead eyebrow="What to expect" title="Three strands" />
          <ol className="mt-10 grid gap-5 sm:grid-cols-3">
            {strands.map((strand, index) => (
              <li
                key={strand.title}
                className="rounded-[1.35rem] bg-white p-7 shadow-card"
              >
                <span className="numeral">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-[1.45rem] leading-tight">
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
        <section>
          <Container className="py-16 sm:py-20">
            <div className="grid items-center gap-10 sm:grid-cols-[minmax(0,16rem)_1fr] sm:gap-14">
              <div className="relative aspect-[4/5] w-full max-w-xs overflow-hidden rounded-[1.35rem] bg-white shadow-card">
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
                <h2 className="mt-5 text-[clamp(1.9rem,4.2vw,3rem)]">
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
