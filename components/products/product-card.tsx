'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import type { Product } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { useCartStore } from '@/stores/cart-store';
import { useAuthStore } from '@/stores/auth-store';

export function ProductCard({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <article className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-soft transition hover:-translate-y-1">
      <Link href={`/products/${product.id}`} className="group">
        <div className="relative mb-4 flex h-56 items-center justify-center overflow-hidden rounded-2xl bg-slate-50 p-6">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-6 transition duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      </Link>

      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
          {product.category}
        </span>
        <span className="text-sm text-slate-500">⭐ {product.rating.rate}</span>
      </div>

      <Link href={`/products/${product.id}`} className="mb-2 line-clamp-2 text-lg font-semibold text-slate-900">
        {product.title}
      </Link>
      <p className="mb-6 text-2xl font-bold text-slate-900">{formatCurrency(product.price)}</p>

      <div className="mt-auto space-y-3">
        <div className="flex items-center gap-3">
          <label htmlFor={`quantity-${product.id}`} className="text-sm text-slate-500">
            Qty
          </label>
          <input
            id={`quantity-${product.id}`}
            type="number"
            min={1}
            value={quantity}
            onChange={(event) => setQuantity(Number(event.target.value) || 1)}
            className="w-20 rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none ring-0 focus:border-brand-500"
          />
        </div>

        {isAuthenticated ? (
          <button
            type="button"
            onClick={() => addItem(product, quantity)}
            className="w-full rounded-2xl px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Add to cart
          </button>
        ) : (
          <Link
            href="/login"
            className="block w-full rounded-2xl bg-brand-500 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-brand-600"
          >
            Login to add to cart
          </Link>
        )}
      </div>
    </article>
  );
}
