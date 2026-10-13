import { PrimaryNav } from "@/components/layout/PrimaryNav";
import { sectionShellClass } from "@/components/layout/Section";
import { navView } from "@/lib/selectors";

/**
 * Non-sticky chrome. Wordmark → home. PrimaryNav carries Writing / Work / Contact.
 * Surface sheet + hairline separates chrome from the fold without a card.
 * Hooks: `data-component="site-header"`, `data-slot="wordmark" | "nav-links"`.
 */
export function SiteHeader() {
  return (
    <header
      data-component="site-header"
      className="border-b border-hairline bg-surface/90 backdrop-blur-[3px]"
    >
      <nav
        aria-label="Primary"
        className={`${sectionShellClass} flex h-14 items-center justify-between gap-4`}
      >
        <a
          href={navView.homeHref}
          data-slot="wordmark"
          className="text-sm font-semibold tracking-tight text-ink"
        >
          {navView.wordmark}
        </a>
        {navView.links.length > 0 ? <PrimaryNav /> : null}
      </nav>
    </header>
  );
}
