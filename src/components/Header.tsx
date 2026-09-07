import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  return (
    <header className="flex items-center justify-between gap-4 py-6">
      <Link
        href="/"
        className="font-display text-lg tracking-tight text-ink hover:text-accent"
      >
        Jarrod Tran
      </Link>
      <nav className="flex items-center gap-1 text-sm">
        <Link
          href="/writing"
          className="rounded-full px-3 py-1.5 text-muted hover:bg-surface hover:text-ink"
        >
          Writing
        </Link>
        <ThemeToggle />
      </nav>
    </header>
  );
}
