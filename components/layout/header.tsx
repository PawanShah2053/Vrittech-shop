'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { useCartStore } from '@/stores/cart-store';
import { useAuthStore } from '@/stores/auth-store';
import { useMounted } from '@/hooks/use-mounted';

;

export function Header() {
  const pathname = usePathname();
  const mounted = useMounted();
  const totalItems = useCartStore((state) => state.totalItems);
  const { isAuthenticated, username, logout } = useAuthStore();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
         
          <div>
            <p className="text-sm font-semibold text-slate-900">Vrittech Shop</p>
            <p className="text-xs text-slate-500">E-commerce dashboard</p>
          </div>
        </Link>

        

        <div className="flex items-center gap-3">
          <Link
            href="/cart"
            className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {mounted ? `(${totalItems()})` : '  '}
          </Link>

          {mounted && isAuthenticated ? (
            <div className="flex items-center gap-2">
              <span className="hidden text-sm text-slate-500 sm:inline">Hi, {username}</span>
              <button
                type="button"
                onClick={logout}
                className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded-full bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
