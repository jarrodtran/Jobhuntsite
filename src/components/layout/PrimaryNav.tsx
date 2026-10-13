"use client";

import { usePathname } from "next/navigation";
import { navView } from "@/lib/selectors";

/**
 * Route-aware primary links. Wordmark is home; this list is Writing / Work / Contact.
 * Hash `#contact` never gets aria-current.
 */
export function PrimaryNav() {
  const pathname = usePathname() ?? "/";

  return (
    <ul
      data-slot="nav-links"
      className="flex items-center gap-x-5 text-sm tracking-tight"
    >
      {navView.links.map((link) => {
        const hash = link.href.startsWith("#");
        const active =
          !hash &&
          (pathname === link.href ||
            (link.href !== "/" && pathname.startsWith(link.href)));

        return (
          <li key={link.href}>
            <a
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={[
                "underline decoration-transparent underline-offset-4 transition-colors duration-150 ease-soft hover:text-ink hover:decoration-ink motion-reduce:transition-none",
                active ? "text-ink decoration-ink" : "text-muted",
              ].join(" ")}
            >
              {link.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
