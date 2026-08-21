import { ButtonLink } from "@/components/Button";
import { Container } from "@/components/Container";
import { Eyebrow } from "@/components/Eyebrow";

export default function NotFound() {
  return (
    <Container className="py-28 sm:py-36">
      <div className="max-w-xl">
        <Eyebrow>Error 404</Eyebrow>
        <h1 className="mt-6 text-[clamp(2.5rem,6.5vw,4.5rem)] leading-[0.98]">
          We can&apos;t find that page
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted">
          The link may be old, or the story may have moved. The archive is a
          good place to start again.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <ButtonLink href="/stories" variant="solid">
            Read the stories
          </ButtonLink>
          <ButtonLink href="/" variant="outline">
            Back home
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}
