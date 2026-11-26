import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section plane-pattern">
      <div className="container-x text-center">
        <p className="text-8xl font-extrabold text-navy-800">404</p>
        <h1 className="mt-4 text-3xl font-bold">This page took a different flight</h1>
        <p className="mt-2 text-muted">The page you&apos;re looking for doesn&apos;t exist.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/" className="btn-primary">Back home</Link>
          <Link href="/destinations" className="btn-outline">Explore destinations</Link>
        </div>
      </div>
    </section>
  );
}
