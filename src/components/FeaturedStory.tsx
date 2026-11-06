import Image from "next/image";
import Link from "next/link";
import type { Story } from "@/content/types";
import { formatDate } from "@/lib/utils";
import { Chip } from "./Chip";

export function FeaturedStory({ story }: { story: Story }) {
  return (
    <article className="group relative overflow-hidden rounded-[1.6rem] bg-ink">
      <div className="relative aspect-[5/6] sm:aspect-[16/10] lg:aspect-[2.15/1]">
        <Image
          src={story.cover.src}
          alt={story.cover.alt}
          fill
          priority
          sizes="(min-width: 1024px) 1100px, 100vw"
          style={{ objectPosition: story.cover.focus ?? "50% 50%" }}
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/45 to-ink/10" />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 lg:max-w-2xl lg:p-12">
        <div className="flex flex-wrap items-center gap-2">
          <Chip tone="gold">Latest</Chip>
          {story.tags.slice(1, 3).map((tag) => (
            <Chip key={tag} tone="onImage">
              {tag}
            </Chip>
          ))}
        </div>

        <h3 className="mt-5 text-[clamp(1.7rem,4vw,3.1rem)] leading-[1.05] text-white">
          <Link
            href={`/stories/${story.slug}`}
            className="after:absolute after:inset-0"
          >
            {story.title}
          </Link>
        </h3>

        <p className="mt-4 max-w-xl text-[1.02rem] leading-relaxed text-white/75">
          {story.dek}
        </p>

        <p className="eyebrow mt-6 text-gold">
          <time dateTime={story.date}>{formatDate(story.date)}</time>
          <span aria-hidden className="mx-2">
            ·
          </span>
          {story.location}
        </p>
      </div>
    </article>
  );
}
