import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { Eyebrow } from "./Eyebrow";

export function PageHero({
  eyebrow,
  title,
  description,
  kicker,
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  kicker?: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-canopy text-white",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgb(196_163_90/0.22),transparent_46%)]"
      />
      <Container className="relative pt-16 pb-14 sm:pt-20 sm:pb-16 lg:pt-24 lg:pb-20">
        {kicker}
        <Eyebrow tone="light" className="w-fit">
          {eyebrow}
        </Eyebrow>
        <h1 className="mt-5 max-w-4xl text-[clamp(2.4rem,6.4vw,4.75rem)] text-white">
          {title}
        </h1>
        {description ? (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/72">
            {description}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
