'use client';

import Image from 'next/image';
import Link from 'next/link';

import { formatCurrency } from '@/lib/utils';
import { useCartStore } from '@/stores/cart-store';

export function CartTable() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCartStore();

  if (!items.length) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-soft">
        <p className="text-lg font-semibold text-slate-900">Your cart is empty</p>
        <p className="mt-2 text-sm text-slate-500">Add products from the catalog to get started.</p>
        <Link
          href="/products"
          className="mt-6 inline-flex rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
        >
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Product</th>
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Price</th>
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Qty</th>
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">Subtotal</th>
                <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((item) => (
                <tr key={item.product.id}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative h-16 w-16 overflow-hidden rounded-2xl bg-slate-50">
                        <Image src={item.product.image} alt={item.product.title} fill className="object-contain p-2" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{item.product.title}</p>
                        <p className="text-sm text-slate-500">{item.product.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-700">{formatCurrency(item.product.price)}</td>
                  <td className="px-5 py-4">
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(event) => updateQuantity(item.product.id, Number(event.target.value) || 1)}
                      className="w-20 rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-brand-500"
                    />
                  </td>
                  <td className="px-5 py-4 text-sm font-semibold text-slate-900">
                    {formatCurrency(item.product.price * item.quantity)}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => removeItem(item.product.id)}
                      className="text-sm font-medium text-rose-600 hover:text-rose-700"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
        <p className="text-lg font-semibold text-slate-900">Order summary</p>
        <div className="mt-6 space-y-4 text-sm text-slate-600">
          <div className="flex items-center justify-between">
            <span>Items</span>
            <span>{items.length}</span>
          </div>
          <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-base font-semibold text-slate-900">
            <span>Total</span>
            <span>{formatCurrency(totalPrice())}</span>
          </div>
        </div>

        <button
          type="button"
          className="mt-6 w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white"
        >
          Checkout
        </button>
        <button
          type="button"
          onClick={clearCart}
          className="mt-3 w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700"
        >
          Clear cart
        </button>
      </aside>
    </div>
  );
}
