import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Chip } from "@/components/Chip";
import { Container } from "@/components/Container";
import { Eyebrow } from "@/components/Eyebrow";
import { Gallery } from "@/components/Gallery";
import { Prose } from "@/components/Prose";
import { SupportSection } from "@/components/SupportSection";
import { storyBodies } from "@/content/stories/bodies";
import {
  getAdjacentStories,
  getStoryBySlug,
  getStorySlugs,
} from "@/lib/content";
import { absoluteUrl } from "@/lib/site";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return getStorySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/stories/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const story = getStoryBySlug(slug);
  if (!story) return {};

  return {
    title: story.title,
    description: story.dek,
    openGraph: {
      type: "article",
      title: story.title,
      description: story.dek,
      publishedTime: story.date,
      images: [{ url: absoluteUrl(story.cover.src), alt: story.cover.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: story.title,
      description: story.dek,
      images: [absoluteUrl(story.cover.src)],
    },
  };
}

export default async function StoryPage(props: PageProps<"/stories/[slug]">) {
  const { slug } = await props.params;
  const story = getStoryBySlug(slug);
  const loadBody = storyBodies[slug];

  if (!story || !loadBody) notFound();

  const { default: Body } = await loadBody();
  const { previous, next } = getAdjacentStories(slug);
  const portraitCover = story.cover.height > story.cover.width;

  return (
    <article>
      <section className="relative overflow-hidden bg-canopy text-white">
        {!portraitCover ? (
          <>
            <Image
              src={story.cover.src}
              alt=""
              fill
              priority
              sizes="100vw"
              style={{ objectPosition: story.cover.focus ?? "50% 50%" }}
              className="object-cover opacity-45"
            />
            <div className="absolute inset-0 bg-linear-to-t from-canopy via-canopy/80 to-canopy/50" />
          </>
        ) : null}

        <Container className="relative pt-10 pb-14 sm:pt-14 sm:pb-16">
          <Link
            href="/stories"
            className="group inline-flex items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
          >
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:-translate-x-1"
            >
              &larr;
            </span>
            All stories
          </Link>

          <header className="mt-8 max-w-4xl">
            <div className="flex flex-wrap gap-2">
              {story.tags.map((tag) => (
                <Chip key={tag} tone="onImage">
                  {tag}
                </Chip>
              ))}
            </div>

            <h1 className="mt-6 text-[clamp(2.2rem,5.8vw,4.4rem)] leading-[1.02] text-white">
              {story.title}
            </h1>

            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-white/75">
              {story.dek}
            </p>
          </header>
        </Container>
      </section>

      <Container className="mt-8 sm:mt-10">
        {portraitCover ? (
          <div className="grid gap-8 sm:grid-cols-[minmax(0,26rem)_1fr] sm:items-end">
            <Image
              src={story.cover.src}
              alt={story.cover.alt}
              width={story.cover.width}
              height={story.cover.height}
              priority
              sizes="(min-width: 640px) 26rem, 100vw"
              className="h-auto w-full rounded-[1.35rem] bg-paper"
            />
            <dl className="grid grid-cols-2 gap-6 rounded-[1.35rem] bg-white p-6 shadow-card sm:p-8">
              <StoryMeta term="Date">
                <time dateTime={story.date}>{formatDate(story.date)}</time>
              </StoryMeta>
              <StoryMeta term="Location">{story.location}</StoryMeta>
              <StoryMeta term="Reporting">The Lofa24 team</StoryMeta>
              <StoryMeta term="Subjects">{story.tags.join(", ")}</StoryMeta>
            </dl>
          </div>
        ) : (
          <>
            <div className="relative aspect-[16/10] overflow-hidden rounded-[1.6rem] bg-paper shadow-card sm:aspect-[2/1]">
              <Image
                src={story.cover.src}
                alt={story.cover.alt}
                fill
                priority
                sizes="(min-width: 1280px) 1100px, 100vw"
                style={{ objectPosition: story.cover.focus ?? "50% 50%" }}
                className="object-cover"
              />
            </div>
            <dl className="mt-6 grid grid-cols-2 gap-6 rounded-[1.35rem] bg-white p-6 shadow-card sm:grid-cols-4 sm:p-8">
              <StoryMeta term="Date">
                <time dateTime={story.date}>{formatDate(story.date)}</time>
              </StoryMeta>
              <StoryMeta term="Location">{story.location}</StoryMeta>
              <StoryMeta term="Reporting">The Lofa24 team</StoryMeta>
              <StoryMeta term="Subjects">{story.tags.join(", ")}</StoryMeta>
            </dl>
          </>
        )}
      </Container>

      <Container className="py-14 sm:py-16">
        <div className="max-w-[38rem]">
          <Prose>
            <Body />
          </Prose>
        </div>

        {story.outcome ? (
          <aside className="mt-12 max-w-[38rem] rounded-[1.35rem] border-l-4 border-gold bg-paper p-7 sm:p-9">
            <Eyebrow>What happened next</Eyebrow>
            <p className="mt-4 font-display text-[1.3rem] leading-[1.3] font-semibold tracking-[-0.03em] sm:text-[1.5rem]">
              {story.outcome}
            </p>
          </aside>
        ) : null}

        {story.gallery.length > 0 ? (
          <section className="mt-16">
            <Eyebrow>From the visit</Eyebrow>
            <div className="mt-8">
              <Gallery images={story.gallery} />
            </div>
          </section>
        ) : null}
      </Container>

      {previous || next ? (
        <Container className="pb-16">
          <nav
            aria-label="More stories"
            className="grid gap-5 sm:grid-cols-2"
          >
            {previous ? (
              <Link
                href={`/stories/${previous.slug}`}
                className="group rounded-[1.35rem] bg-white p-7 shadow-card transition-transform duration-300 hover:-translate-y-1"
              >
                <p className="eyebrow">&larr; Newer story</p>
                <p className="mt-4 font-display text-[1.3rem] leading-tight font-semibold tracking-[-0.03em]">
                  {previous.title}
                </p>
              </Link>
            ) : (
              <span aria-hidden className="hidden sm:block" />
            )}

            {next ? (
              <Link
                href={`/stories/${next.slug}`}
                className="group rounded-[1.35rem] bg-white p-7 shadow-card transition-transform duration-300 hover:-translate-y-1 sm:col-start-2 sm:text-right"
              >
                <p className="eyebrow sm:justify-end">Older story &rarr;</p>
                <p className="mt-4 font-display text-[1.3rem] leading-tight font-semibold tracking-[-0.03em]">
                  {next.title}
                </p>
              </Link>
            ) : null}
          </nav>
        </Container>
      ) : null}

      <SupportSection />
    </article>
  );
}

function StoryMeta({
  term,
  children,
}: {
  term: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <dt className="eyebrow">{term}</dt>
      <dd className="mt-2 text-[0.9375rem] leading-snug text-ink">{children}</dd>
    </div>
  );
}
