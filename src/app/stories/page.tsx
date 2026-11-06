import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { StoryGrid } from "@/components/StoryGrid";
import { SupportSection } from "@/components/SupportSection";
import { getAllStories, getAllTags } from "@/lib/content";

export const metadata: Metadata = {
  title: "Stories",
  description:
    "Community stories reported across Lofa County, Liberia by the Lofa24 team.",
};

export default function StoriesPage() {
  return (
    <>
      <PageHero
        eyebrow="The archive"
        title="Stories from Lofa County"
        description="We report what people tell us, we say plainly what happened afterwards, and we do not close a file just because the photographs have been taken."
      />

      <Container className="py-14 sm:py-16">
        <StoryGrid stories={getAllStories()} tags={getAllTags()} />
      </Container>

      <SupportSection />
    </>
  );
}
