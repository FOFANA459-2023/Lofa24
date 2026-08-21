import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink, TextLink } from "@/components/Button";
import { Container } from "@/components/Container";
import { Eyebrow } from "@/components/Eyebrow";
import { SectionHead } from "@/components/SectionHead";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: site.description,
};

const method = [
  {
    title: "Somebody tells us",
    body: "A tip comes from a neighbour, a volunteer, a listener, or one of our own team walking through Voinjama. Almost never from an institution.",
  },
  {
    title: "We go and sit down",
    body: "In the home, on the bench, at the market stall. We bring a microphone and a camera and let the person set the order of their own story.",
  },
  {
    title: "We publish it plainly",
    body: "No rewriting someone into a victim, no inventing a tidy ending. If a story did not resolve, we say that it did not resolve.",
  },
  {
    title: "We stay with it",
    body: "Readers respond, supplies get delivered, and we report what actually arrived. Then we keep the file open.",
  },
];

const facts: [string, string][] = [
  ["What we are", "A youth-led community media platform"],
  ["Where we work", "Lofa County, Liberia — based in Voinjama"],
  ["What we make", "Stories, conversations, video, photography, a podcast"],
  ["Who we amplify", "Young people and adolescent girls, first"],
];

export default function AboutPage() {
  return (
    <>
      <Container className="pt-14 pb-14 sm:pt-20">
        <div className="max-w-4xl">
          <Eyebrow>About Lofa24</Eyebrow>
          <h1 className="mt-6 text-[clamp(2.5rem,6.5vw,4.5rem)] leading-[0.98]">
            A county deserves to be described by the people who live in it
            <span className="text-red">.</span>
          </h1>
        </div>
      </Container>

      <Container>
        <div className="relative aspect-[16/9] overflow-hidden bg-paper sm:aspect-[21/9]">
          <Image
            src="/assets/images/hero/market-visit.jpg"
            alt="A Lofa24 team member sits with an elderly woman and two children under a market shelter in Lofa County."
            fill
            priority
            sizes="(min-width: 1280px) 1216px, 100vw"
            className="object-cover object-[58%_26%]"
          />
        </div>
      </Container>

      {/* Mission — the one long quotation on the site. */}
      <section className="mt-20 border-y border-rule bg-paper sm:mt-24">
        <Container className="py-20 sm:py-24">
          <Eyebrow>Mission</Eyebrow>
          <p className="mt-8 max-w-5xl font-display text-[clamp(1.5rem,3.2vw,2.5rem)] leading-[1.2] font-bold tracking-[-0.035em]">
            {site.mission}
          </p>
        </Container>
      </section>

      <Container className="py-20 sm:py-24">
        <div className="grid gap-14 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
          <div className="max-w-[38rem] space-y-14">
            <div>
              <h2 className="text-[clamp(1.75rem,3.4vw,2.5rem)]">
                Why Lofa County
              </h2>
              <p className="mt-6 text-[1.0625rem] leading-[1.8] text-ink">
                Lofa sits in Liberia&apos;s north, far from the newsrooms in
                Monrovia. When national or international media do arrive, they
                usually arrive for a crisis, file, and leave. The ordinary
                texture of the county — how a household with three visually
                impaired members organises a day, what it costs to keep a wooden
                trading booth standing through the rains, what happens to an
                eighteen-year-old who cannot pay a hospital bill — goes
                unrecorded.
              </p>
              <p className="mt-5 text-[1.0625rem] leading-[1.8] text-ink">
                Lofa24 exists to close that gap from the inside. Our reporters
                live here. They are not visiting.
              </p>
            </div>

            <div>
              <h2 className="text-[clamp(1.75rem,3.4vw,2.5rem)]">
                Who we listen to first
              </h2>
              <p className="mt-6 text-[1.0625rem] leading-[1.8] text-ink">
                We give particular weight to young people and to adolescent
                girls, because they are the largest part of Lofa&apos;s
                population and the smallest part of its public conversation.
                They are rarely the ones holding the microphone, and rarely the
                ones being asked. On this platform, they are both.
              </p>
            </div>
          </div>

          <aside className="h-fit border border-rule bg-white p-8 shadow-lift">
            <Eyebrow>At a glance</Eyebrow>
            <dl className="mt-7 divide-y divide-rule">
              {facts.map(([term, value]) => (
                <div key={term} className="py-5 first:pt-0 last:pb-0">
                  <dt className="eyebrow">{term}</dt>
                  <dd className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </Container>

      <section className="border-t border-rule bg-paper">
        <Container className="py-20 sm:py-24">
          <SectionHead eyebrow="Our method" title="How a story gets made" />
          <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {method.map((item, index) => (
              <li
                key={item.title}
                className="border border-rule bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <span className="numeral">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-[1.375rem] leading-tight">
                  {item.title}
                </h3>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">
                  {item.body}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4">
            <ButtonLink href="/stories" variant="solid">
              Read the stories
            </ButtonLink>
            <TextLink href="/team">Meet the team</TextLink>
          </div>
        </Container>
      </section>
    </>
  );
}
