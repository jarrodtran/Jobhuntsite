import { profile } from "@/content";
import { asset } from "@/lib/asset";

export function Contact() {
  return (
    <footer
      id="contact"
      className="mx-auto mt-16 max-w-[720px] border-t border-rule px-6 py-10"
    >
      <h2 className="font-serif text-xl tracking-tight sm:text-2xl">Contact</h2>
      <p className="mt-3">{profile.location}</p>
      {profile.clearance ? (
        <p className="mt-1 text-sm text-muted">{profile.clearance}</p>
      ) : null}
      {profile.availability ? (
        <p className="mt-1 text-sm text-muted">{profile.availability}</p>
      ) : null}
      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
        <li>
          <a
            href={`mailto:${profile.email}`}
            className="underline decoration-rule underline-offset-4 hover:decoration-foreground"
          >
            {profile.email}
          </a>
        </li>
        <li>
          <a
            href={profile.linkedin}
            className="underline decoration-rule underline-offset-4 hover:decoration-foreground"
          >
            LinkedIn
          </a>
        </li>
        {profile.github ? (
          <li>
            <a
              href={profile.github}
              className="underline decoration-rule underline-offset-4 hover:decoration-foreground"
            >
              GitHub
            </a>
          </li>
        ) : null}
        <li>
          <a
            href={asset(profile.resumePdf)}
            className="underline decoration-rule underline-offset-4 hover:decoration-foreground"
          >
            Resume
          </a>
        </li>
      </ul>
    </footer>
  );
}
