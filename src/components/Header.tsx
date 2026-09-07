"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  const pathname = usePathname();
  const home = pathname === "/";
  const writing = pathname === "/writing" || pathname.startsWith("/writing/");

  return (
    <header className="flex items-center justify-between gap-4 py-6">
      <Link
        href="/"
        aria-current={home ? "page" : undefined}
        className="rounded-sm font-display text-lg tracking-tight text-ink hover:text-accent"
      >
        Jarrod Tran
      </Link>
      <div className="flex items-center gap-1">
        <nav aria-label="Primary" className="flex items-center text-sm">
          <Link
            href="/writing"
            aria-current={writing ? "page" : undefined}
            className={
              writing
                ? "rounded-full bg-surface px-3 py-1.5 text-ink"
                : "rounded-full px-3 py-1.5 text-muted hover:bg-surface hover:text-ink"
            }
          >
            Writing
          </Link>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
