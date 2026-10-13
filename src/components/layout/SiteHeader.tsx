import { PrimaryNav } from "@/components/layout/PrimaryNav";
import { sectionShellClass } from "@/components/layout/Section";
import { navView } from "@/lib/selectors";

/**
 * Non-sticky chrome. Wordmark → home. PrimaryNav carries Writing / Work / Contact.
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
        {navView.links.length > 0 ? <PrimaryNav /> : null}
      </nav>
    </header>
  );
}
