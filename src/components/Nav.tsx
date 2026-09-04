import { contact, hero, site } from "@/content";
import { asset } from "@/lib/asset";

export function Nav() {
  return (
    <header className="border-b border-rule">
      <nav
        className="mx-auto flex h-12 max-w-[720px] items-center justify-between gap-4 px-6"
        aria-label="Primary"
      >
        <a href="#top" className="font-serif text-[15px] tracking-tight">
          {hero.name}
        </a>
        <div className="flex items-center gap-x-5">
          <ul className="hidden items-center gap-x-5 text-sm sm:flex">
            {site.nav.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-muted transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={asset(contact.resumePdf)}
            className="rounded-sm bg-accent px-3 py-1.5 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
          >
            Resume
          </a>
        </div>
      </nav>
    </header>
  );
}
