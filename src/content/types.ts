export type ImageRef = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  /** CSS object-position used when the image has to be cropped to a frame. */
  focus?: string;
};

export type StoryTag =
  | "Community Story"
  | "Disability"
  | "Health"
  | "Women & Girls"
  | "Livelihoods";

export type Story = {
  slug: string;
  title: string;
  /** One-line standfirst shown under the headline and in cards. */
  dek: string;
  /** ISO date the team was on the ground. */
  date: string;
  location: string;
  tags: StoryTag[];
  cover: ImageRef;
  gallery: ImageRef[];
  /** What the reporting led to. Rendered in a distinct block. */
  outcome?: string;
};

/** Where a person sits in the organisation, used to structure the team page. */
export type TeamTier = "founder" | "executive" | "directors" | "field";

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  bio: string;
  photo: ImageRef;
  tier: TeamTier;
  order: number;
};
