'use client';

import Link from 'next/link';

import { CartTable } from '@/components/cart/cart-table';
import { useAuthStore } from '@/stores/auth-store';
import { useMounted } from '@/hooks/use-mounted';

export default function CartPage() {
  const mounted = useMounted();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!mounted) {
    return (
      <div className="grid min-h-[50vh] place-items-center">
        <div className="rounded-3xl border border-slate-200 bg-white px-6 py-4 text-sm font-medium text-slate-600 shadow-soft">
          Loading cart...
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="grid min-h-[60vh] place-items-center">
        <div className="max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-soft">
          <p className="text-2xl font-bold text-slate-900">Login required</p>
          <p className="mt-3 text-sm text-slate-500">
            The cart is intentionally available only to logged-in users for the bonus requirement.
          </p>
          <Link
            href="/login"
            className="mt-6 inline-flex rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
          >
            Go to login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section>
        <p className="text-sm font-medium text-brand-700">Your basket</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-950">Cart summary</h1>
        <p className="mt-2 text-sm text-slate-500">Update quantities, review totals, and keep progress in local storage.</p>
      </section>

      <CartTable />
    </div>
  );
}
