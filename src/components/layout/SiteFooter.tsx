import { sectionShellClass } from "@/components/layout/Section";
import { footerView } from "@/lib/selectors";

/**
 * Email + LinkedIn only. No location, availability, or resume duplicate.
 * <address> makes the contact info machine-identifiable; the footer is the
 * `#contact` anchor the header nav points at.
 * Hooks: `data-section="contact"`, `data-slot="contact-links"`.
 */
export function SiteFooter() {
  return (
    <footer
      id={footerView.section.id}
      data-section={footerView.section.id}
      aria-label={footerView.section.heading}
      className={`${sectionShellClass} mt-section pb-10`}
    >
      <address className="border-t border-hairline pt-8 not-italic">
        <ul
          data-slot="contact-links"
          className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm"
        >
          {footerView.links.map((cta) => (
            <li key={cta.kind}>
              <a
                href={cta.href}
                data-cta={cta.kind}
                className="link text-ink"
                {...(cta.external ? { rel: "noopener" } : {})}
              >
                {cta.label}
              </a>
            </li>
          ))}
        </ul>
      </address>
    </footer>
  );
}
