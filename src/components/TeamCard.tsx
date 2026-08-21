import Image from "next/image";
import type { TeamMember } from "@/content/types";
import { cn } from "@/lib/utils";

/**
 * One card, three sizes. `feature` is the founder, `lead` the executive
 * director, and the default is used for directors and the field team — so the
 * hierarchy is legible from the card sizes alone, before you read a word.
 */
export function TeamCard({
  member,
  size = "default",
}: {
  member: TeamMember;
  size?: "feature" | "lead" | "default";
}) {
  const horizontal = size === "feature" || size === "lead";

  return (
    <article
      className={cn(
        "group flex overflow-hidden border border-rule bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lift",
        horizontal ? "flex-col sm:flex-row" : "flex-col",
      )}
    >
      {/* Portraits run from 600x600 to 1124x1867, so every one is forced into
          the same 4:5 frame and anchored to the top to keep faces in. */}
      <div
        className={cn(
          "relative shrink-0 overflow-hidden bg-paper",
          horizontal
            ? size === "feature"
              ? "aspect-[4/5] sm:w-64 lg:w-72"
              : "aspect-[4/5] sm:w-52 lg:w-56"
            : "aspect-[4/5]",
        )}
      >
        <Image
          src={member.photo.src}
          alt={member.photo.alt}
          fill
          sizes={
            horizontal
              ? "(min-width: 640px) 18rem, 100vw"
              : "(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
          }
          className="object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
        />
      </div>

      <div
        className={cn(
          "flex flex-col justify-center",
          size === "feature" ? "p-7 sm:p-10" : size === "lead" ? "p-7 sm:p-8" : "p-6",
        )}
      >
        <p className="numeral">{member.role}</p>
        <h3
          className={cn(
            "mt-3 leading-[1.05]",
            size === "feature"
              ? "text-[clamp(1.75rem,3.6vw,2.5rem)]"
              : size === "lead"
                ? "text-[1.75rem]"
                : "text-[1.375rem]",
          )}
        >
          {member.name}
        </h3>
        <p
          className={cn(
            "mt-4 leading-relaxed text-muted",
            size === "feature" ? "text-[1.0625rem]" : "text-[0.9375rem]",
          )}
        >
          {member.bio}
        </p>
      </div>
    </article>
  );
}
