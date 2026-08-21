import { cn } from "@/lib/utils";

/** Label with a short red tick — the recurring marker for every section. */
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
        "eyebrow flex items-center gap-2.5",
        tone === "light" && "text-white/60",
        className,
      )}
    >
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-red" />
      {children}
    </p>
  );
}
