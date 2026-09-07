import { links } from "@/content/site";
import { isPlaceholder } from "@/lib/format";

export function Footer() {
  const year = new Date().getFullYear();
  const items = [
    { href: `mailto:${links.email}`, label: "Email", hidden: isPlaceholder(links.email) },
    { href: links.linkedin, label: "LinkedIn", hidden: isPlaceholder(links.linkedin) },
    { href: links.github, label: "GitHub", hidden: isPlaceholder(links.github) },
    { href: "/feed.xml", label: "RSS", hidden: false },
  ].filter((item) => !item.hidden);

  return (
    <footer className="mt-24 border-t border-hairline py-10 text-sm text-muted">
      <p className="font-display text-base text-ink">On the web</p>
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
        {items.map((item) => (
          <li key={item.label}>
            <a href={item.href} className="link">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-8">© {year} Jarrod Tran</p>
    </footer>
  );
}
