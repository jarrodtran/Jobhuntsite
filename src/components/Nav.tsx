import { profile } from "@/content";
import { asset } from "@/lib/asset";

export function Nav() {
  return (
    <header className="border-b border-rule">
      <nav
        className="mx-auto flex h-12 max-w-[720px] items-center justify-between px-6"
        aria-label="Primary"
      >
        <a href="#top" className="font-serif text-[15px] tracking-tight">
          {profile.name}
        </a>
        <a
          href={asset(profile.resumePdf)}
          className="rounded-sm bg-accent px-3 py-1.5 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
        >
          Resume
        </a>
      </nav>
    </header>
  );
}
