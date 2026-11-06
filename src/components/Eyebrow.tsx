import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  className,
  tone = "muted",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "muted" | "light";
}) {
  return (
    <p
      className={cn(
        "eyebrow flex items-center gap-3",
        tone === "light" && "text-gold",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "h-px w-7",
          tone === "light" ? "bg-gold" : "bg-red",
        )}
      />
      {children}
    </p>
  );
}
