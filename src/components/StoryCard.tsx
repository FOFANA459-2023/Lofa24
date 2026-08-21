import Image from "next/image";
import Link from "next/link";
import type { Story } from "@/content/types";
import { cn, formatDate } from "@/lib/utils";
import { Chip } from "./Chip";

export function StoryCard({
  story,
  index,
  priority = false,
  className,
}: {
  story: Story;
  index: number;
  priority?: boolean;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden border border-rule bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lift",
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-paper">
        <Image
          src={story.cover.src}
          alt=""
          fill
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          style={{ objectPosition: story.cover.focus ?? "50% 50%" }}
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute bottom-3 left-3">
          {/* Every story carries "Community Story", so prefer the more
              specific second tag when there is one. */}
          <Chip tone="onImage">{story.tags[1] ?? story.tags[0]}</Chip>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <span className="numeral">{String(index + 1).padStart(2, "0")}</span>

        <h3 className="mt-3 text-[1.5rem] leading-[1.1] sm:text-[1.75rem]">
          <Link
            href={`/stories/${story.slug}`}
            className="after:absolute after:inset-0"
          >
            {story.title}
          </Link>
        </h3>

        <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-muted">
          {story.dek}
        </p>

        <div className="mt-6 flex items-center justify-between gap-4 border-t border-rule pt-4">
          <p className="eyebrow">
            <time dateTime={story.date}>{formatDate(story.date)}</time>
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
