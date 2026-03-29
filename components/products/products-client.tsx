'use client';

import { useMemo, useState, useTransition } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Pagination } from './pagination';
import { ProductCard } from './product-card';
import { ProductFiltersPanel } from './product-filters';

import type { Product, ProductFilters } from '@/types';

const PRODUCTS_PER_PAGE = 6;

type ProductsClientProps = {
  products: Product[];
  categories: string[];
  initialFilters: ProductFilters;
};

export function ProductsClient({ products, categories, initialFilters }: ProductsClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<ProductFilters>(initialFilters);
  const [isPending, startTransition] = useTransition();

  const filteredProducts = useMemo(() => {
    const min = filters.minPrice ? Number(filters.minPrice) : 0;
    const max = filters.maxPrice ? Number(filters.maxPrice) : Number.POSITIVE_INFINITY;

    return products.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(filters.search.toLowerCase());
      const matchesCategory = filters.category ? product.category === filters.category : true;
      const matchesPrice = product.price >= min && product.price <= max;

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [filters.category, filters.maxPrice, filters.minPrice, filters.search, products]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE));
  const safePage = Math.min(filters.page, totalPages);
  const visibleProducts = filteredProducts.slice(
    (safePage - 1) * PRODUCTS_PER_PAGE,
    safePage * PRODUCTS_PER_PAGE
  );

  const buildQueryString = (nextFilters: ProductFilters) => {
    const params = new URLSearchParams(searchParams.toString());

    if (nextFilters.category) params.set('category', nextFilters.category);
    else params.delete('category');

    if (nextFilters.search) params.set('search', nextFilters.search);
    else params.delete('search');

    if (nextFilters.minPrice) params.set('minPrice', nextFilters.minPrice);
    else params.delete('minPrice');

    if (nextFilters.maxPrice) params.set('maxPrice', nextFilters.maxPrice);
    else params.delete('maxPrice');

    params.set('sort', nextFilters.sort);
    params.set('page', String(nextFilters.page));

    return params.toString();
  };

  const handleChange = <K extends keyof ProductFilters>(key: K, value: ProductFilters[K]) => {
    const nextFilters = {
      ...filters,
      [key]: value,
      page: key === 'page' ? Number(value) : 1
    } as ProductFilters;

    setFilters(nextFilters);

    const nextUrl = `${pathname}?${buildQueryString(nextFilters)}`;

    if (key === 'sort') {
      startTransition(() => {
        router.push(nextUrl, { scroll: false });
      });
      return;
    }

    startTransition(() => {
      router.replace(nextUrl, { scroll: false });
    });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <ProductFiltersPanel filters={filters} categories={categories} onChange={handleChange} />

      <section className="space-y-6">
      

        {visibleProducts.length ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-soft">
            <p className="text-lg font-semibold text-slate-900">No products found</p>
            <p className="mt-2 text-sm text-slate-500">Try changing the filters or search keyword.</p>
          </div>
        )}

        <Pagination
          currentPage={safePage}
          totalPages={totalPages}
          onPageChange={(page) => handleChange('page', page)}
        />
      </section>
    </div>
  );
}
