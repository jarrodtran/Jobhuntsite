"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  const pathname = usePathname();
  const writing = pathname.startsWith("/writing");

  return (
    <header className="flex min-h-20 items-center justify-between gap-4 border-b border-hairline">
      <Link
        href="/"
        aria-current={pathname === "/" ? "page" : undefined}
        className="font-display text-lg tracking-[-0.02em] text-ink hover:text-accent"
      >
        Jarrod Tran
      </Link>
      <nav aria-label="Primary" className="flex items-center gap-1 text-sm">
        <Link
          href="/writing"
          aria-current={writing ? "page" : undefined}
          className="inline-flex min-h-11 items-center px-3 text-muted underline-offset-4 hover:text-ink aria-[current=page]:text-ink aria-[current=page]:underline"
        >
          Writing
        </Link>
        <ThemeToggle />
      </nav>
    </header>
  );
}
