import { cn } from "@/lib/utils";
import { Eyebrow } from "./Eyebrow";

export function SectionHead({
  eyebrow,
  title,
  description,
  action,
  className,
  as: Tag = "h2",
  tone = "dark",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
  as?: "h1" | "h2";
  tone?: "dark" | "light";
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-end justify-between gap-x-10 gap-y-6",
        className,
      )}
    >
      <div className="max-w-2xl">
        <Eyebrow tone={tone === "light" ? "light" : "muted"}>{eyebrow}</Eyebrow>
        <Tag
          className={cn(
            "mt-4",
            Tag === "h1"
              ? "text-[clamp(2.4rem,6.2vw,4.5rem)]"
              : "text-[clamp(1.9rem,4.2vw,3.1rem)]",
            tone === "light" && "text-white",
          )}
        >
          {title}
        </Tag>
        {description ? (
          <p
            className={cn(
              "mt-5 text-[1.0625rem] leading-relaxed",
              tone === "light" ? "text-white/70" : "text-muted",
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0 pb-1">{action}</div> : null}
    </div>
  );
}
