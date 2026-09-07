import { links } from "@/content/site";
import { isPlaceholder } from "@/lib/format";

type FooterLink = {
  href: string;
  label: string;
  hidden: boolean;
  external?: boolean;
  ariaLabel?: string;
};

export function Footer() {
  const year = new Date().getFullYear();
  const items: FooterLink[] = [
    {
      href: links.linkedin,
      label: "LinkedIn",
      hidden: isPlaceholder(links.linkedin),
      external: true,
    },
    {
      href: `mailto:${links.email}`,
      label: "Email",
      hidden: isPlaceholder(links.email),
    },
    {
      href: links.github,
      label: "GitHub",
      hidden: isPlaceholder(links.github),
      external: true,
    },
    {
      href: "/feed.xml",
      label: "RSS",
      ariaLabel: "RSS feed",
      hidden: false,
    },
  ].filter((item) => !item.hidden);

  return (
    <footer className="mt-24 border-t border-hairline py-10 text-sm text-muted">
      <nav aria-label="On the web">
        <h2 className="font-display text-base text-ink">On the web</h2>
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
          {items.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="link"
                aria-label={item.ariaLabel}
                {...(item.external
                  ? { rel: "noopener noreferrer" }
                  : undefined)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <p className="mt-8">© {year} Jarrod Tran</p>
    </footer>
  );
}
