import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { Container } from "./Container";

const columns = [
  {
    heading: "Read",
    links: [
      { href: "/stories", label: "All stories" },
      { href: "/podcast", label: "Podcast" },
    ],
  },
  {
    heading: "About",
    links: [
      { href: "/about", label: "Who we are" },
      { href: "/team", label: "The team" },
    ],
  },
  {
    heading: "Take part",
    links: [
      { href: "/get-involved", label: "Get involved" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

/* Handles have not been supplied yet, so these are listed without links
   rather than shipping dead URLs. */
const socials = ["Facebook", "YouTube", "TikTok", "WhatsApp"];

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-ink text-white/70">
      <Container className="py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_repeat(3,minmax(0,1fr))]">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <Image
                src="/assets/images/brand/mark.png"
                alt=""
                width={512}
                height={512}
                className="h-9 w-9"
              />
              <span className="font-display text-[1.375rem] leading-none font-extrabold tracking-[-0.04em] text-white">
                Lofa<span className="text-red">24</span>
              </span>
            </div>

            <p className="mt-7 font-display text-2xl leading-[1.15] font-bold tracking-[-0.035em] text-white">
              Our Stories. Our People. Our Lofa
              <span className="text-red">.</span>
            </p>

            <p className="mt-5 text-sm leading-relaxed">{site.description}</p>
          </div>

          {columns.map((column) => (
            <div key={column.heading}>
              <h2 className="eyebrow text-white/45">{column.heading}</h2>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/12 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="eyebrow text-white/45">
            &copy; {new Date().getFullYear()} {site.name} &mdash; {site.location}
          </p>
          <ul className="eyebrow flex flex-wrap gap-x-5 gap-y-2 text-white/45">
            {socials.map((social) => (
              <li key={social}>{social}</li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
