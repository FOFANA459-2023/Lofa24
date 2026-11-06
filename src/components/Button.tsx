import Link from "next/link";
import { cn } from "@/lib/utils";

const base =
  "group inline-flex items-center justify-center gap-2.5 rounded-lg px-5 py-3 text-sm font-semibold tracking-tight transition-all duration-200";

const variants = {
  solid: "bg-canopy text-white hover:bg-ink",
  red: "bg-red text-white hover:bg-red/90",
  outline:
    "border border-rule bg-white text-ink hover:border-gold hover:bg-paper",
  light: "border border-white/20 bg-white/8 text-white hover:bg-white/14",
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
      <span className="border-b border-gold/70 pb-0.5 transition-colors group-hover:border-ink">
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
