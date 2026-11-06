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
        "group relative flex flex-col overflow-hidden rounded-[1.35rem] bg-white shadow-card transition-transform duration-300 hover:-translate-y-1",
        className,
      )}
    >
      <div className="relative aspect-[16/11] overflow-hidden bg-paper">
        <Image
          src={story.cover.src}
          alt=""
          fill
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          style={{ objectPosition: story.cover.focus ?? "50% 50%" }}
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-linear-to-t from-ink/35 to-transparent" />
        <div className="absolute bottom-3 left-3">
          <Chip tone="onImage">{story.tags[1] ?? story.tags[0]}</Chip>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <span className="numeral">{String(index + 1).padStart(2, "0")}</span>

        <h3 className="mt-2 text-[1.45rem] leading-[1.12] sm:text-[1.6rem]">
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

        <p className="eyebrow mt-6 border-t border-rule pt-4">
          <time dateTime={story.date}>{formatDate(story.date)}</time>
        </p>
      </div>
    </article>
  );
}
