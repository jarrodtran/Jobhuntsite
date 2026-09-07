"use client";

import type { MouseEvent } from "react";

export function SkipLink() {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    const main = document.getElementById("main");
    if (!main) return;

    event.preventDefault();
    main.focus();
    main.scrollIntoView();
  }

  return (
    <a
      href="#main"
      onClick={handleClick}
      className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:left-4 focus-visible:top-3 focus-visible:z-50 focus-visible:rounded-md focus-visible:bg-surface focus-visible:px-3 focus-visible:py-2 focus-visible:text-ink"
    >
      Skip to content
    </a>
  );
}
