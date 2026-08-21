import Link from "next/link";
import { cn } from "@/lib/utils";

const base =
  "group inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-200";

const variants = {
  solid: "bg-ink text-white hover:bg-ink-soft",
  red: "bg-red text-white hover:bg-red/90",
  outline: "border border-rule bg-white text-ink hover:border-ink/40 hover:shadow-lift",
  light: "border border-white/25 text-white hover:bg-white/10",
} as const;

export function ButtonLink({
  href,
  variant = "solid",
  className,
  children,
}: {
  href: string;
  variant?: keyof typeof variants;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={cn(base, variants[variant], className)}>
      {children}
      <span
        aria-hidden
        className="transition-transform duration-300 group-hover:translate-x-1"
      >
        &rarr;
      </span>
    </Link>
  );
}

export function TextLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 text-sm font-semibold text-ink",
        className,
      )}
    >
      <span className="border-b border-ink/25 pb-0.5 transition-colors group-hover:border-ink">
        {children}
      </span>
      <span
        aria-hidden
        className="transition-transform duration-300 group-hover:translate-x-1"
      >
        &rarr;
      </span>
    </Link>
  );
}
