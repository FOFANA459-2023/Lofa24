import type { Metadata } from "next";
import type { TeamTier } from "@/content/types";
import { ButtonLink } from "@/components/Button";
import { Container } from "@/components/Container";
import { Eyebrow } from "@/components/Eyebrow";
import { TeamCard } from "@/components/TeamCard";
import { getTeamByTier } from "@/lib/content";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "The Team",
  description:
    "The youth-led team behind Lofa24 — founder, executive director, directors, and the field crew reporting across Lofa County, Liberia.",
};

const tiers: Record<TeamTier, { label: string; note: string }> = {
  founder: {
    label: "Founder",
    note: "Set up Lofa24 and sets its direction.",
  },
  executive: {
    label: "Executive direction",
    note: "Runs the organisation day to day.",
  },
  directors: {
    label: "Directors",
    note: "Lead content, podcast, and technical production.",
  },
  field: {
    label: "Field team",
    note: "Shoot and cut everything you see on this site.",
  },
};

export default function TeamPage() {
  const groups = getTeamByTier();

  return (
    <>
      <Container className="pt-14 pb-16 sm:pt-20">
        <div className="max-w-3xl">
          <Eyebrow>Our team</Eyebrow>
          <h1 className="mt-6 text-[clamp(2.5rem,6.5vw,4.5rem)] leading-[0.98]">
            A team from Lofa, reporting on Lofa
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Advocates, creators, editors, and volunteers &mdash; most of them
            young, all of them working on the county they come from.
          </p>
        </div>
      </Container>

      {/* The hierarchy runs down a single spine: a hairline with a marker at
          each tier, and card sizes that shrink as the tier widens. */}
      <Container className="pb-20 sm:pb-24">
        <div className="relative">
          <span
            aria-hidden
            className="absolute top-2 bottom-8 left-[3px] hidden w-px bg-rule lg:block"
          />

          <div className="space-y-16 sm:space-y-20">
            {groups.map((group, groupIndex) => {
              const meta = tiers[group.tier];
              return (
                <section key={group.tier} className="relative lg:pl-16">
                  <span
                    aria-hidden
                    className="absolute top-2 left-0 hidden h-[7px] w-[7px] rounded-full bg-red lg:block"
                  />

                  <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2 border-b border-rule pb-4">
                    <span className="numeral">
                      {String(groupIndex + 1).padStart(2, "0")}
                    </span>
                    <h2 className="text-[1.375rem] tracking-[-0.03em]">
                      {meta.label}
                    </h2>
                    <p className="text-sm text-muted">{meta.note}</p>
                  </div>

                  <div
                    className={cn(
                      "mt-8 grid gap-6",
                      group.tier === "directors" && "lg:grid-cols-3 sm:grid-cols-2",
                      group.tier === "field" && "sm:grid-cols-2 lg:max-w-3xl",
                      group.tier === "executive" && "lg:max-w-4xl",
                    )}
                  >
                    {group.members.map((member) => (
                      <TeamCard
                        key={member.slug}
                        member={member}
                        size={
                          group.tier === "founder"
                            ? "feature"
                            : group.tier === "executive"
                              ? "lead"
                              : "default"
                        }
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </Container>

      <section className="border-t border-rule bg-paper">
        <Container className="py-20 sm:py-24">
          <div className="max-w-3xl">
            <Eyebrow>Join them</Eyebrow>
            <h2 className="mt-6 text-[clamp(2rem,4.5vw,3.25rem)]">
              Lofa24 is youth-led and runs on volunteers.{" "}
              <span className="accent">There is room for you.</span>
            </h2>
            <p className="mt-6 text-[1.0625rem] leading-relaxed text-muted">
              If you want to learn reporting, camera work, editing, audio, or
              design, we will train you on real assignments rather than in a
              classroom.
            </p>
            <div className="mt-9">
              <ButtonLink href="/get-involved" variant="solid">
                Volunteer with us
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
