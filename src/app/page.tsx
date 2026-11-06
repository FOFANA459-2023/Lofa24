import Image from "next/image";
import { ButtonLink, TextLink } from "@/components/Button";
import { Chip } from "@/components/Chip";
import { Container } from "@/components/Container";
import { Eyebrow } from "@/components/Eyebrow";
import { FeaturedStory } from "@/components/FeaturedStory";
import { Marquee } from "@/components/Marquee";
import { SectionHead } from "@/components/SectionHead";
import { StoryCard } from "@/components/StoryCard";
import { SupportSection } from "@/components/SupportSection";
import { getAllStories, getTeam } from "@/lib/content";

const practice = [
  {
    title: "Community stories",
    body: "We go to people's homes, benches, and market stalls and let them describe their own lives — in their own order, at their own pace.",
  },
  {
    title: "Conversations",
    body: "We put young people and local leaders in the same room, so the questions that get asked are the ones the community actually has.",
  },
  {
    title: "Digital media",
    body: "Video, audio, and photography made in Lofa by people from Lofa, so the county is documented by the people who live in it.",
  },
];

export default function HomePage() {
  const stories = getAllStories();
  const [lead, ...rest] = stories;
  const team = getTeam();

  const figures: [string, string][] = [
    ["Stories on file", String(stories.length).padStart(2, "0")],
    ["On the team", String(team.length).padStart(2, "0")],
    ["Based in", "Voinjama"],
    ["Reporting since", "2026"],
  ];

  return (
    <>
      <section className="relative min-h-[84svh] overflow-hidden bg-canopy text-white">
        <Image
          src="/assets/images/hero/market-visit.jpg"
          alt="A Lofa24 team member sits with an elderly woman and two children under a market shelter in Lofa County, all of them smiling."
          fill
          priority
          sizes="100vw"
          className="object-cover object-[58%_28%]"
        />
        <div className="absolute inset-0 bg-linear-to-r from-canopy/95 via-canopy/55 to-canopy/15" />
        <div className="absolute inset-0 bg-linear-to-t from-canopy/80 via-transparent to-canopy/25" />

        <Container className="relative flex min-h-[84svh] flex-col items-start justify-end pb-16 pt-24 sm:pb-20 lg:justify-center lg:pb-28 lg:pt-16">
          <Chip tone="gold">Youth-led community media</Chip>
          <h1 className="mt-6 max-w-3xl text-[clamp(2.8rem,8vw,6.2rem)] leading-[0.95] text-white">
            Our Stories.
            <br />
            Our People.
            <br />
            Our <span className="italic text-gold">Lofa.</span>
          </h1>
          <p className="mt-7 max-w-lg text-lg leading-relaxed text-white/78">
            Lofa24 tells the stories, experiences, and concerns of people across
            Lofa County — and makes sure the people in them are heard by someone
            who can act.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <ButtonLink href="/stories" variant="light">
              Read the stories
            </ButtonLink>
            <TextLink href="/about" className="text-white">
              What we do
            </TextLink>
          </div>
        </Container>
      </section>

      <Marquee
        items={[
          "Our Stories",
          "Our People",
          "Our Lofa",
          "Reporting from Voinjama",
        ]}
      />

      <section className="bg-canvas">
        <Container className="py-10 sm:py-12">
          <dl className="grid grid-cols-2 overflow-hidden rounded-[1.35rem] bg-white shadow-card sm:grid-cols-4">
            {figures.map(([term, value]) => (
              <div
                key={term}
                className="border-rule px-5 py-7 sm:border-l sm:px-7 sm:py-8 sm:first:border-l-0"
              >
                <dt className="eyebrow">{term}</dt>
                <dd className="mt-3 font-display text-[2rem] font-semibold tracking-[-0.04em] sm:text-[2.35rem]">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <section>
        <Container className="py-16 sm:py-20">
          <SectionHead
            eyebrow="From the field"
            title="The latest from Lofa"
            action={<TextLink href="/stories">All stories</TextLink>}
          />
          <div className="mt-10">
            <FeaturedStory story={lead} />
          </div>
        </Container>
      </section>

      <section className="bg-paper">
        <Container className="py-16 sm:py-20">
          <Eyebrow>More stories</Eyebrow>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((story, index) => (
              <StoryCard key={story.slug} story={story} index={index + 1} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-canvas">
        <Container className="py-16 sm:py-20">
          <SectionHead
            eyebrow="How we work"
            title="Three ways we put Lofa on the record"
          />
          <ol className="mt-12 grid gap-5 sm:grid-cols-3">
            {practice.map((item, index) => (
              <li
                key={item.title}
                className="rounded-[1.35rem] bg-white p-7 shadow-card"
              >
                <span className="numeral">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-[1.5rem] leading-tight">
                  {item.title}
                </h3>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">
                  {item.body}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-paper">
        <Container className="py-16 sm:py-20">
          <SectionHead
            eyebrow="The people behind it"
            title="A team from Lofa, reporting on Lofa"
            action={<TextLink href="/team">Meet everyone</TextLink>}
          />

          <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
            {team.map((member) => (
              <li key={member.slug} className="group">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.15rem] bg-white">
                  <Image
                    src={member.photo.src}
                    alt={member.photo.alt}
                    fill
                    sizes="(min-width: 1024px) 14vw, (min-width: 640px) 25vw, 50vw"
                    className="object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                  />
                </div>
                <p className="mt-3 font-display text-[0.95rem] leading-tight font-semibold tracking-[-0.02em]">
                  {member.name}
                </p>
                <p className="eyebrow mt-1.5">{member.role}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <SupportSection />
    </>
  );
}
