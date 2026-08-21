import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Eyebrow } from "@/components/Eyebrow";
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
      <Container className="pt-14 pb-16 sm:pt-20">
        <div className="max-w-3xl">
          <Eyebrow>The archive</Eyebrow>
          <h1 className="mt-6 text-[clamp(2.5rem,6.5vw,4.5rem)] leading-[0.98]">
            Stories from Lofa County
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            We report what people tell us, we say plainly what happened
            afterwards, and we do not close a file just because the photographs
            have been taken.
          </p>
        </div>
      </Container>

      <Container className="pb-24">
        <StoryGrid stories={getAllStories()} tags={getAllTags()} />
      </Container>

      <SupportSection />
    </>
  );
}
