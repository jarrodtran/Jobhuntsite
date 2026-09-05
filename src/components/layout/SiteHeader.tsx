import { sectionShellClass } from "@/components/layout/Section";
import { navView } from "@/lib/selectors";

/**
 * Non-sticky. Wordmark + in-page section links at every width; the Resume CTA
 * lives in the hero directly below, so the header carries no button.
 * Hooks: `data-component="site-header"`, `data-slot="wordmark" | "nav-links"`.
 */
export function SiteHeader() {
  return (
    <header data-component="site-header" className="border-b border-hairline">
      <nav
        aria-label="Primary"
        className={`${sectionShellClass} flex h-12 items-center justify-between gap-4`}
      >
        <a
          href={navView.homeHref}
          data-slot="wordmark"
          className="text-sm font-medium tracking-tight"
        >
          {navView.wordmark}
        </a>
        {navView.links.length > 0 ? (
          <ul data-slot="nav-links" className="flex items-center gap-x-4 text-sm">
            {navView.links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-muted hover:text-ink">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </nav>
    </header>
  );
}
