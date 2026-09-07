import { links } from "@/content/site";
import { isPlaceholder } from "@/lib/format";

export function Footer() {
  const year = new Date().getFullYear();
  const items = [
    { href: links.linkedin, label: "LinkedIn", hidden: isPlaceholder(links.linkedin) },
    { href: `mailto:${links.email}`, label: "Email", hidden: isPlaceholder(links.email) },
    { href: links.github, label: "GitHub", hidden: isPlaceholder(links.github) },
    { href: "/feed.xml", label: "RSS", hidden: false },
  ].filter((item) => !item.hidden);

  return (
    <footer className="mt-32 border-t border-hairline py-10 text-sm text-muted md:mt-40">
      <nav aria-label="On the web">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink">
          On the web
        </p>
        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-3">
          {items.map((item) => (
            <li key={item.label}>
              <a href={item.href} className="link">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <p className="mt-10 text-xs">© {year} Jarrod Tran</p>
    </footer>
  );
}
