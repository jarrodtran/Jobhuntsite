import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" tabIndex={-1} className="record-flow py-16 md:py-24">
      <section className="record-section">
        <p className="record-label">404</p>
        <div className="record-body">
          <h1 className="font-display text-5xl leading-none tracking-[-0.04em]">
            Page not found
          </h1>
          <p className="record-serif mt-6 text-muted">
            That URL does not exist on this site.
          </p>
          <nav aria-label="Helpful links" className="mt-8 flex gap-5">
            <Link href="/" className="link">
              Home
            </Link>
            <Link href="/writing" className="link">
              Writing
            </Link>
          </nav>
        </div>
      </section>
    </main>
  );
}
