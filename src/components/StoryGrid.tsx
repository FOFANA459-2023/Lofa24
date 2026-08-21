"use client";

import { useMemo, useState } from "react";
import type { Story, StoryTag } from "@/content/types";
import { cn } from "@/lib/utils";
import { StoryCard } from "./StoryCard";

const ALL = "All stories" as const;

export function StoryGrid({
  stories,
  tags,
}: {
  stories: Story[];
  tags: StoryTag[];
}) {
  const [active, setActive] = useState<StoryTag | typeof ALL>(ALL);

  const visible = useMemo(
    () =>
      active === ALL
        ? stories
        : stories.filter((story) => story.tags.includes(active)),
    [active, stories],
  );

  const filters = [ALL, ...tags] as const;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border-b border-rule pb-6">
        <div
          role="group"
          aria-label="Filter stories by topic"
          className="flex flex-wrap gap-2"
        >
          {filters.map((filter) => {
            const selected = filter === active;
            return (
              <button
                key={filter}
                type="button"
                aria-pressed={selected}
                onClick={() => setActive(filter)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200",
                  selected
                    ? "border-ink bg-ink text-white"
                    : "border-rule bg-white text-muted hover:border-ink/30 hover:text-ink",
                )}
              >
                {filter}
              </button>
            );
          })}
        </div>

        <p aria-live="polite" className="eyebrow">
          {String(visible.length).padStart(2, "0")}{" "}
          {visible.length === 1 ? "story" : "stories"}
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((story, index) => (
          <StoryCard
            key={story.slug}
            story={story}
            index={index}
            priority={index < 3}
          />
        ))}
      </div>
    </div>
  );
}
