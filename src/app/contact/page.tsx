import type { Metadata } from "next";
import { MapPin, Mic, Users } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { Container } from "@/components/Container";
import { Eyebrow } from "@/components/Eyebrow";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach the Lofa24 team in Voinjama, Lofa County — to share a story, volunteer, or support the people we report on.",
};

const notes = [
  {
    icon: MapPin,
    heading: "Where we are",
    detail: site.location,
    body: "Our reporters are in the county. If you are nearby, you can reach us in person.",
  },
  {
    icon: Users,
    heading: "Bringing us a story",
    body: "You do not need to prepare anything. Tell us roughly what is happening and where, and we will arrange to come and listen properly.",
  },
  {
    icon: Mic,
    heading: "Media and partnerships",
    body: "For republishing a story, requesting an interview, or working with us on a reporting series, mark your message as press.",
  },
];

export default function ContactPage() {
  return (
    <>
      <Container className="pt-14 pb-14 sm:pt-20">
        <div className="max-w-3xl">
          <Eyebrow>Contact</Eyebrow>
          <h1 className="mt-6 text-[clamp(2.5rem,6.5vw,4.5rem)] leading-[0.98]">
            Get in touch
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Whether you have a story, want to join the team, or want to support
            a family we have reported on &mdash; this is the way in.
          </p>
        </div>
      </Container>

      <Container className="pb-24">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <ContactForm />

          <aside className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {notes.map((note) => (
              <div key={note.heading} className="border border-rule bg-paper p-7">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white">
                  <note.icon className="h-5 w-5" aria-hidden />
                </span>
                <h2 className="mt-5 text-[1.25rem] leading-tight">
                  {note.heading}
                </h2>
                {note.detail ? (
                  <p className="mt-2 text-[0.9375rem] font-medium text-ink">
                    {note.detail}
                  </p>
                ) : null}
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
                  {note.body}
                </p>
              </div>
            ))}
          </aside>
        </div>
      </Container>
    </>
  );
}
