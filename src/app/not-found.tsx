import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" tabIndex={-1} className="fade-up py-16">
      <p className="text-sm text-muted">404</p>
      <h1 className="mt-3 font-display text-4xl tracking-tight">
        Page not found
      </h1>
      <p className="mt-4 max-w-prose text-muted">
        That URL does not exist on this site.
      </p>
      <nav aria-label="Helpful links" className="mt-8">
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          <li>
            <Link href="/" className="link">
              Home
            </Link>
          </li>
          <li>
            <Link href="/writing" className="link">
              Writing
            </Link>
          </li>
        </ul>
      </nav>
    </main>
  );
}
