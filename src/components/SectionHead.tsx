import { cn } from "@/lib/utils";
import { Eyebrow } from "./Eyebrow";

export function SectionHead({
  eyebrow,
  title,
  description,
  action,
  className,
  as: Tag = "h2",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-end justify-between gap-x-10 gap-y-6",
        className,
      )}
    >
      <div className="max-w-2xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <Tag
          className={cn(
            "mt-5",
            Tag === "h1"
              ? "text-[clamp(2.5rem,6.5vw,4.5rem)]"
              : "text-[clamp(2rem,4.5vw,3.25rem)]",
          )}
        >
          {title}
        </Tag>
        {description ? (
          <p className="mt-5 text-[1.0625rem] leading-relaxed text-muted">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0 pb-1">{action}</div> : null}
    </div>
  );
}
