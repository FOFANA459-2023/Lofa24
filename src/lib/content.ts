import { stories } from "@/content/stories";
import { team } from "@/content/team";
import type {
  Story,
  StoryTag,
  TeamMember,
  TeamTier,
} from "@/content/types";

/**
 * Every page reads content through these helpers rather than importing the
 * data files directly, so swapping the typed files for a CMS later touches
 * only this module.
 */

export function getAllStories(): Story[] {
  return [...stories].sort((a, b) => b.date.localeCompare(a.date));
}

export function getStoryBySlug(slug: string): Story | undefined {
  return stories.find((story) => story.slug === slug);
}

export function getStorySlugs(): string[] {
  return getAllStories().map((story) => story.slug);
}

/** Previous/next in reading order (newest first), for footer navigation. */
export function getAdjacentStories(slug: string): {
  previous?: Story;
  next?: Story;
} {
  const ordered = getAllStories();
  const index = ordered.findIndex((story) => story.slug === slug);
  if (index === -1) return {};
  return {
    previous: ordered[index - 1],
    next: ordered[index + 1],
  };
}

export function getAllTags(): StoryTag[] {
  const seen = new Set<StoryTag>();
  for (const story of getAllStories()) {
    for (const tag of story.tags) seen.add(tag);
  }
  return [...seen];
}

export function getTeam(): TeamMember[] {
  return [...team].sort((a, b) => a.order - b.order);
}

/** The team grouped into its hierarchy, in rank order, for the team page. */
export function getTeamByTier(): { tier: TeamTier; members: TeamMember[] }[] {
  const order: TeamTier[] = ["founder", "executive", "directors", "field"];
  return order
    .map((tier) => ({
      tier,
      members: getTeam().filter((member) => member.tier === tier),
    }))
    .filter((group) => group.members.length > 0);
}
