'use client';

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="grid min-h-[60vh] place-items-center">
      <div className="max-w-lg rounded-3xl border border-rose-200 bg-white p-8 text-center shadow-soft">
        <p className="text-lg font-semibold text-slate-900">Something went wrong</p>
        <p className="mt-3 text-sm text-slate-500">{error.message || 'Unexpected application error.'}</p>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-6 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
