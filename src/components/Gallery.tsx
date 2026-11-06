import Image from "next/image";
import type { ImageRef } from "@/content/types";
import { cn } from "@/lib/utils";

export function Gallery({ images }: { images: ImageRef[] }) {
  if (images.length === 0) return null;

  return (
    <ul className="grid gap-6 sm:grid-cols-2">
      {images.map((image) => {
        const portrait = image.height > image.width;
        return (
          <li
            key={image.src}
            className={cn(
              "flex flex-col",
              !portrait && images.length > 1 && "sm:col-span-2",
            )}
          >
            <div
              className={cn(
                "relative overflow-hidden rounded-[1.35rem] bg-paper",
                portrait ? "aspect-[3/4]" : "aspect-[16/9]",
              )}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes={
                  portrait
                    ? "(min-width: 640px) 50vw, 100vw"
                    : "(min-width: 1024px) 70vw, 100vw"
                }
                style={{ objectPosition: image.focus ?? "50% 50%" }}
                className="object-cover"
              />
            </div>
            {image.caption ? (
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {image.caption}
              </p>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
