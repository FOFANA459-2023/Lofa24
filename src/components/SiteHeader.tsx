"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])",
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/8 bg-canopy">
        <Container className="flex h-16 items-center justify-between gap-6 sm:h-[4.5rem]">
          <Link
            href="/"
            aria-label="Lofa24 home"
            className="flex shrink-0 items-center gap-2.5"
          >
            <Image
              src="/assets/images/brand/mark.png"
              alt=""
              width={512}
              height={512}
              priority
              className="h-8 w-8 rounded-md sm:h-9 sm:w-9"
            />
            <span className="font-display text-[1.35rem] leading-none font-semibold tracking-[-0.03em] text-white">
              Lofa<span className="text-gold">24</span>
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.slice(1).map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "rounded-lg px-3.5 py-2 text-[0.8125rem] font-semibold tracking-wide uppercase transition-colors",
                        active
                          ? "bg-white/10 text-gold"
                          : "text-white/70 hover:bg-white/8 hover:text-white",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden rounded-lg bg-gold px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-white lg:inline-flex"
            >
              Partner with us
            </Link>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="-mr-1 inline-flex h-10 w-10 items-center justify-center lg:hidden"
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              <span aria-hidden className="relative block h-3 w-5">
                <span
                  className={cn(
                    "absolute left-0 block h-[1.5px] w-5 bg-white transition-transform duration-300",
                    open ? "top-1.5 rotate-45" : "top-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 block h-[1.5px] w-5 bg-white transition-transform duration-300",
                    open ? "top-1.5 -rotate-45" : "top-3",
                  )}
                />
              </span>
            </button>
          </div>
        </Container>
      </header>

      {open ? (
        <div
          id="mobile-nav"
          ref={panelRef}
          className="fixed inset-0 z-40 flex flex-col bg-canopy pt-16 sm:pt-[4.5rem] lg:hidden"
        >
          <nav aria-label="Primary mobile" className="flex-1 overflow-y-auto">
            <ul className="px-5 py-4 sm:px-8">
              {nav.map((item, index) => {
                const active = isActive(pathname, item.href);
                return (
                  <li
                    key={item.href}
                    className="border-b border-white/10 last:border-0"
                  >
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline gap-4 py-4"
                    >
                      <span className="numeral w-6 text-gold">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={cn(
                          "font-display text-2xl font-semibold tracking-[-0.03em]",
                          active ? "text-gold" : "text-white",
                        )}
                      >
                        {item.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="border-t border-white/10 px-5 py-5 sm:px-8">
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="flex w-full items-center justify-center rounded-lg bg-gold px-6 py-3.5 text-sm font-semibold text-ink"
            >
              Partner with us
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
}
