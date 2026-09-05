import { Section } from "@/components/layout/Section";
import { CtaLink } from "@/components/ui/CtaLink";
import { contactView } from "@/lib/selectors";

/**
 * Final stop on the scan path: email, LinkedIn, resume. Rendered as the page
 * <footer> with an <address> so the contact info is machine-identifiable.
 * Optional lines (location, clearance, availability) only render when set.
 *
 * Hooks: `data-section="contact"`, `data-slot="details" | "contact-links"`.
 */
export function Contact() {
  return (
    <Section
      meta={contactView.section}
      as="footer"
      className="border-t border-rule py-10"
    >
      {contactView.details.length > 0 ? (
        <ul data-slot="details" className="mt-3 space-y-1">
          {contactView.details.map((line, index) => (
            <li
              key={line}
              className={index === 0 ? undefined : "text-meta text-muted"}
            >
              {line}
            </li>
          ))}
        </ul>
      ) : null}

      <address className="not-italic">
        <ul
          data-slot="contact-links"
          className="mt-4 flex flex-wrap gap-x-5 gap-y-2"
        >
          <li>
            <CtaLink cta={contactView.email} />
          </li>
          {contactView.links.map((cta) => (
            <li key={cta.kind}>
              <CtaLink cta={cta} />
            </li>
          ))}
        </ul>
      </address>
    </Section>
  );
}
