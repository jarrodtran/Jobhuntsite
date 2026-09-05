import { sectionShellClass } from "@/components/layout/Section";
import { CtaLink } from "@/components/ui/CtaLink";
import { navView } from "@/lib/selectors";

/**
 * Mobile-first: wordmark + Resume on every width; section links from `sm`.
 * Hooks: `data-component="site-header"`, `data-slot="nav-links"`.
 */
export function SiteHeader() {
  return (
    <header data-component="site-header" className="border-b border-rule">
      <nav
        aria-label="Primary"
        className={`${sectionShellClass} flex h-12 items-center justify-between gap-4`}
      >
        <a
          href={navView.homeHref}
          data-slot="wordmark"
          className="font-serif text-[15px] tracking-tight"
        >
          {navView.wordmark}
        </a>
        <div className="flex items-center gap-x-5">
          {navView.links.length > 0 ? (
            <ul
              data-slot="nav-links"
              className="hidden items-center gap-x-5 text-meta sm:flex"
            >
              {navView.links.map((link) => (
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
          ) : null}
          <CtaLink cta={navView.resume} variant="primary" className="px-3 py-1.5" />
        </div>
      </nav>
    </header>
  );
}
