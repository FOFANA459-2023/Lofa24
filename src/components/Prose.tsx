import { cn } from "@/lib/utils";

export function Prose({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "prose prose-story max-w-none",
        "prose-p:text-[1.0625rem] prose-p:leading-[1.8] prose-p:text-ink",
        "[&>p:first-child]:text-[1.3rem] [&>p:first-child]:leading-[1.55] [&>p:first-child]:tracking-[-0.01em]",
        "prose-a:underline prose-a:underline-offset-4 prose-a:decoration-gold",
        className,
      )}
    >
      {children}
    </div>
  );
}
