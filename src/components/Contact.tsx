import { contact } from "@/content";
import { asset } from "@/lib/asset";
import { hasText } from "@/lib/content";

export function Contact() {
  const details = [contact.location, contact.clearance, contact.availability]
    .filter(hasText);

  return (
    <footer
      id="contact"
      className="mx-auto mt-16 max-w-[720px] border-t border-rule px-6 py-10"
    >
      <h2 className="font-serif text-xl tracking-tight sm:text-2xl">Contact</h2>
      {details.length > 0 ? (
        <ul className="mt-3 space-y-1">
          {details.map((line, index) => (
            <li
              key={line}
              className={index === 0 ? undefined : "text-sm text-muted"}
            >
              {line}
            </li>
          ))}
        </ul>
      ) : null}
      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
        <li>
          <a
            href={`mailto:${contact.email}`}
            className="underline decoration-rule underline-offset-4 hover:decoration-foreground"
          >
            {contact.email}
          </a>
        </li>
        <li>
          <a
            href={contact.linkedin}
            className="underline decoration-rule underline-offset-4 hover:decoration-foreground"
          >
            LinkedIn
          </a>
        </li>
        {hasText(contact.github) ? (
          <li>
            <a
              href={contact.github}
              className="underline decoration-rule underline-offset-4 hover:decoration-foreground"
            >
              GitHub
            </a>
          </li>
        ) : null}
        <li>
          <a
            href={asset(contact.resumePdf)}
            className="underline decoration-rule underline-offset-4 hover:decoration-foreground"
          >
            Resume
          </a>
        </li>
      </ul>
    </footer>
  );
}
