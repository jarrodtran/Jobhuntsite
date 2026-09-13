import {
  headingId,
  sectionLabelClass,
  sectionShellClass,
} from "@/components/layout/Section";
import { ANCHOR_OFFSET_CLASS } from "@/lib/chrome";
import { ctaAnchorProps, footerView } from "@/lib/selectors";

/**
 * Email, LinkedIn, and city. Resume stays in the hero and sticky chrome.
 * <address> makes the contact info machine-identifiable; the footer is the
 * `#contact` anchor the header nav points at, so it carries the same scroll
 * offset as every other anchor target.
 *
 * The heading is a real <h2> matching the other sections rather than an
 * `aria-label` on the landmark. Browsing by headings is a normal way to read a
 * page, and with the label hidden the outline ran h1 → Experience → Where I fit
 * → nothing: Contact did not exist to that reader. Sighted users clicking
 * "Contact" in the nav also landed on an unlabelled strip of links.
 *
 * Hooks: `data-section="contact"`, `data-slot="section-heading|contact-links"`.
 */
export function SiteFooter() {
  return (
    <footer
      id={footerView.section.id}
      data-section={footerView.section.id}
      aria-labelledby={headingId(footerView.section)}
      className={`${sectionShellClass} mt-section pb-10 ${ANCHOR_OFFSET_CLASS}`}
    >
      <div className="border-t border-hairline pt-10">
        <h2
          id={headingId(footerView.section)}
          data-slot="section-heading"
          className={sectionLabelClass}
        >
          {footerView.section.heading}
        </h2>
        <address className="mt-3 not-italic">
          <ul
            data-slot="contact-links"
            className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm"
          >
            {footerView.links.map((cta) => (
              <li key={cta.kind}>
                <a
                  data-cta={cta.kind}
                  className="link text-ink"
                  {...ctaAnchorProps(cta)}
                >
                  {cta.label}
                </a>
              </li>
            ))}
            {footerView.location ? (
              <li data-slot="location">{footerView.location}</li>
            ) : null}
          </ul>
        </address>
      </div>
    </footer>
  );
}
