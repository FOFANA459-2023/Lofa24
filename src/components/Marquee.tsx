export function Marquee({ items }: { items: string[] }) {
  const line = [...items, ...items];

  return (
    <div className="overflow-hidden bg-gold py-3">
      <div className="marquee-track flex w-max">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 items-center"
          >
            {line.map((item, index) => (
              <li
                key={`${copy}-${index}`}
                className="eyebrow flex items-center gap-8 px-8 text-ink"
              >
                {item}
                <span aria-hidden className="h-1 w-1 rounded-full bg-red" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
