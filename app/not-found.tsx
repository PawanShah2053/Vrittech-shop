import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="grid min-h-[60vh] place-items-center">
      <div className="max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-soft">
        <p className="text-3xl font-bold text-slate-900">404</p>
        <p className="mt-3 text-lg font-semibold text-slate-900">Page not found</p>
        <p className="mt-2 text-sm text-slate-500">The page you are looking for does not exist.</p>
        <Link
          href="/products"
          className="mt-6 inline-flex rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
        >
          Back to products
        </Link>
      </div>
    </div>
  );
}
