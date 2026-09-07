import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="fade-up py-16">
      <h1 className="font-display text-4xl tracking-tight">Page not found</h1>
      <p className="mt-4 text-muted">That URL does not exist on this site.</p>
      <p className="mt-6">
        <Link href="/" className="link">
          Back home
        </Link>
      </p>
    </main>
  );
}
