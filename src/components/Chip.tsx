import { cn } from "@/lib/utils";

export function Chip({
  children,
  className,
  tone = "default",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "default" | "onImage" | "red" | "gold";
}) {
  return (
    <span
      className={cn(
        "eyebrow inline-flex w-fit items-center rounded-md px-2.5 py-1",
        tone === "default" && "bg-paper text-ink",
        tone === "onImage" && "bg-white/92 text-ink backdrop-blur-sm",
        tone === "red" && "bg-red text-white",
        tone === "gold" && "bg-gold text-ink",
        className,
      )}
    >
      {children}
    </span>
  );
}
