import { sectionShellClass } from "@/components/layout/Section";
import { navView } from "@/lib/selectors";

/**
 * Non-sticky. Wordmark + in-page section links at every width; the Resume CTA
 * lives in the hero directly below, so the header carries no button. The links
 * pad vertically and pull the padding back with a negative margin: a thumb gets
 * a 34px target on a phone, the 48px bar keeps its height.
 * Hooks: `data-component="site-header"`, `data-slot="wordmark" | "nav-links"`.
 */
export function SiteHeader() {
  return (
    <header data-component="site-header">
      <nav
        aria-label="Primary"
        className={`${sectionShellClass} flex h-12 items-center justify-between gap-4`}
      >
        <a
          href={navView.homeHref}
          data-slot="wordmark"
          className="text-sm font-semibold tracking-tight"
        >
          {navView.wordmark}
        </a>
        {navView.links.length > 0 ? (
          <ul
            data-slot="nav-links"
            className="flex items-center gap-x-5 text-sm"
          >
            {navView.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="-my-2 inline-block py-2 text-muted underline decoration-transparent underline-offset-4 transition-colors duration-150 ease-soft hover:text-ink hover:decoration-ink motion-reduce:transition-none"
                >
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
