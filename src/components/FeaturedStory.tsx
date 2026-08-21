import Image from "next/image";
import Link from "next/link";
import type { Story } from "@/content/types";
import { formatDate } from "@/lib/utils";
import { Chip } from "./Chip";

/**
 * The lead entry. The text panel overlaps the photograph on wide screens,
 * which gives the section a focal point without needing extra colour.
 */
export function FeaturedStory({ story }: { story: Story }) {
  return (
    <article className="group relative lg:grid lg:grid-cols-12 lg:items-center">
      <div className="relative aspect-[4/3] overflow-hidden bg-paper sm:aspect-[16/10] lg:col-span-8 lg:aspect-[4/3]">
        <Image
          src={story.cover.src}
          alt={story.cover.alt}
          fill
          priority
          sizes="(min-width: 1024px) 66vw, 100vw"
          style={{ objectPosition: story.cover.focus ?? "50% 50%" }}
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
        />
      </div>

      <div className="relative -mt-10 mr-4 ml-4 border border-rule bg-white p-7 sm:-mt-16 sm:mr-10 sm:ml-10 sm:p-10 lg:col-span-5 lg:col-start-8 lg:m-0 lg:p-12 lg:shadow-lift">
        <div className="flex flex-wrap items-center gap-2">
          <Chip tone="red">Latest</Chip>
          {story.tags.slice(1, 3).map((tag) => (
            <Chip key={tag}>{tag}</Chip>
          ))}
        </div>

        <h3 className="mt-6 text-[clamp(1.875rem,4.2vw,3rem)] leading-[1.03]">
          <Link
            href={`/stories/${story.slug}`}
            className="after:absolute after:inset-0"
          >
            {story.title}
          </Link>
        </h3>

        <p className="mt-5 text-[1.0625rem] leading-relaxed text-muted">
          {story.dek}
        </p>

        <div className="mt-8 flex items-center justify-between gap-4 border-t border-rule pt-5">
          <p className="eyebrow">
            <time dateTime={story.date}>{formatDate(story.date)}</time>
            <span aria-hidden className="mx-2 text-rule">
              &bull;
            </span>
            {story.location}
          </p>
          <span
            aria-hidden
            className="text-ink transition-transform duration-300 group-hover:translate-x-1"
          >
            &rarr;
          </span>
        </div>
      </div>
    </article>
  );
}
