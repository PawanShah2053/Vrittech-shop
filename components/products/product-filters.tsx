'use client';

import type { ProductFilters, SortOrder } from '@/types';

type ProductFiltersProps = {
  filters: ProductFilters;
  categories: string[];
  onChange: <K extends keyof ProductFilters>(key: K, value: ProductFilters[K]) => void;
};

export function ProductFiltersPanel({ filters, categories, onChange }: ProductFiltersProps) {
  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft">
      <div className="mb-5">
        <p className="text-lg font-semibold text-slate-900">Filters</p>
        <p className="text-sm text-slate-500">Search, refine, and sort products.</p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Search</label>
          <input
            value={filters.search}
            onChange={(event) => onChange('search', event.target.value)}
            placeholder="Search by product name"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Category</label>
          <select
            value={filters.category}
            onChange={(event) => onChange('category', event.target.value)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-500"
          >
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Min price</label>
            <input
              type="number"
              value={filters.minPrice}
              onChange={(event) => onChange('minPrice', event.target.value)}
              placeholder="0"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-500"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Max price</label>
            <input
              type="number"
              value={filters.maxPrice}
              onChange={(event) => onChange('maxPrice', event.target.value)}
              placeholder="1000"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-500"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Sort</label>
          <select
            value={filters.sort}
            onChange={(event) => onChange('sort', event.target.value as SortOrder)}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-brand-500"
          >
            <option value="asc">Price: Low to high</option>
            <option value="desc">Price: High to low</option>
          </select>
        </div>
      </div>
    </aside>
  );
}
