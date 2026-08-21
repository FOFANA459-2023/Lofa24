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
import { cn } from "@/lib/utils";

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
      {/* Hero — headline left, a tall photograph right with a caption card
          overlapping its lower corner. */}
      <section className="overflow-hidden">
        <Container className="pt-12 pb-20 sm:pt-16 sm:pb-24 lg:pt-20">
          <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
            <div>
              <Eyebrow>
                Youth-led community media &mdash; Lofa County, Liberia
              </Eyebrow>

              <h1 className="mt-7 text-[clamp(2.75rem,7.5vw,5.5rem)] leading-[0.98]">
                Our Stories.
                <br />
                Our People.
                <br />
                <span className="text-muted">Our </span>Lofa
                <span className="text-red">.</span>
              </h1>

              <p className="mt-8 max-w-lg text-lg leading-relaxed text-muted">
                Lofa24 tells the stories, experiences, and concerns of people
                across Lofa County &mdash; and makes sure the people in them are
                heard by someone who can act.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <ButtonLink href="/stories" variant="solid">
                  Read the stories
                </ButtonLink>
                <TextLink href="/about">What we do</TextLink>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden bg-paper sm:aspect-[3/4]">
                <Image
                  src="/assets/images/hero/market-visit.jpg"
                  alt="A Lofa24 team member sits with an elderly woman and two children under a market shelter in Lofa County, all of them smiling."
                  fill
                  priority
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover object-[58%_28%]"
                />
              </div>

              {/* Hidden on phones, where it would cover most of the photograph. */}
              <div className="absolute right-6 -bottom-9 hidden max-w-[15rem] border border-rule bg-white p-5 shadow-lift sm:block">
                <Chip>Voinjama</Chip>
                <p className="mt-3 text-[0.8125rem] leading-relaxed text-muted">
                  Every photograph on this site was made in Lofa County, by our
                  own team.
                </p>
              </div>
            </div>
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

      {/* Standing figures. */}
      <section className="border-b border-rule">
        <Container>
          <dl className="grid grid-cols-2 sm:grid-cols-4">
            {figures.map(([term, value], index) => (
              <div
                key={term}
                className={cn(
                  "border-rule py-8 sm:py-10 sm:border-l sm:pl-8 sm:first:border-l-0 sm:first:pl-0",
                  index % 2 === 1 ? "border-l pl-6" : "pr-6",
                )}
              >
                <dt className="eyebrow">{term}</dt>
                <dd className="mt-3 font-display text-[2rem] font-bold tracking-[-0.04em] sm:text-[2.5rem]">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Lead story. */}
      <section>
        <Container className="py-20 sm:py-24">
          <SectionHead
            eyebrow="From the field"
            title="The latest from Lofa"
            action={<TextLink href="/stories">All stories</TextLink>}
          />
          <div className="mt-14">
            <FeaturedStory story={lead} />
          </div>
        </Container>
      </section>

      {/* Remaining stories, as cards floating on the warm ground. */}
      <section className="border-y border-rule bg-paper">
        <Container className="py-20 sm:py-24">
          <Eyebrow>More stories</Eyebrow>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((story, index) => (
              <StoryCard key={story.slug} story={story} index={index + 1} />
            ))}
          </div>
        </Container>
      </section>

      {/* Practice. */}
      <section>
        <Container className="py-20 sm:py-24">
          <SectionHead
            eyebrow="How we work"
            title="Three ways we put Lofa on the record"
          />
          <ol className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-8">
            {practice.map((item, index) => (
              <li key={item.title} className="border-t-2 border-ink pt-6">
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

      {/* Team strip. */}
      <section className="border-t border-rule bg-paper">
        <Container className="py-20 sm:py-24">
          <SectionHead
            eyebrow="The people behind it"
            title="A team from Lofa, reporting on Lofa"
            action={<TextLink href="/team">Meet everyone</TextLink>}
          />

          <ul className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-4 lg:grid-cols-7">
            {team.map((member) => (
              <li key={member.slug} className="group">
                <div className="relative aspect-[4/5] overflow-hidden bg-white">
                  <Image
                    src={member.photo.src}
                    alt={member.photo.alt}
                    fill
                    sizes="(min-width: 1024px) 14vw, (min-width: 640px) 25vw, 50vw"
                    className="object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                  />
                </div>
                <p className="mt-3 font-display text-[0.9375rem] leading-tight font-bold tracking-[-0.02em]">
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
