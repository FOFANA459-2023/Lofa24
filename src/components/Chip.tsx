import { cn } from "@/lib/utils";

export function Chip({
  children,
  className,
  tone = "default",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "default" | "onImage" | "red";
}) {
  return (
    <span
      className={cn(
        "eyebrow inline-flex items-center rounded-full px-3 py-1.5",
        tone === "default" && "bg-paper text-ink",
        tone === "onImage" && "bg-white/95 text-ink shadow-sm backdrop-blur-sm",
        tone === "red" && "bg-red text-white",
        className,
      )}
    >
      {children}
    </span>
  );
}
