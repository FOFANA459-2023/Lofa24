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
        /* The opening paragraph carries more weight, the way a standfirst
           does in print. */
        "[&>p:first-child]:text-[1.375rem] [&>p:first-child]:leading-[1.5] [&>p:first-child]:tracking-[-0.01em]",
        "prose-a:underline prose-a:underline-offset-4 prose-a:decoration-red/50",
        className,
      )}
    >
      {children}
    </div>
  );
}
