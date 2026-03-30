import type { Metadata } from 'next';

import { ProductsClient } from '@/components/products/products-client';
import { apiFetch } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import type { Product, ProductFilters, SortOrder } from '@/types';

type ProductsPageProps = {
  searchParams?: {
    category?: string;
    search?: string;
    minPrice?: string;
    maxPrice?: string;
    page?: string;
    sort?: SortOrder;
  };
};

export const metadata: Metadata = {
  title: 'Products',
  description: 'Browse products with server-side rendering, client-side filters, and persistent cart state.'
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const sort = searchParams?.sort === 'desc' ? 'desc' : 'asc';

  let products: Product[] = [];
  let categories: string[] = [];
  
  try {
    [products, categories] = await Promise.all([
      apiFetch<Product[]>(`${API_ENDPOINTS.products}?sort=${sort}`, {
        next: { revalidate: 3600 }
      }),
      apiFetch<string[]>(API_ENDPOINTS.categories, {
        next: { revalidate: 3600 }
      })
    ]);
  } catch (error) {
    console.error('Failed to fetch products:', error);
  }

  const initialFilters: ProductFilters = {
    category: searchParams?.category ?? '',
    search: searchParams?.search ?? '',
    minPrice: searchParams?.minPrice ?? '',
    maxPrice: searchParams?.maxPrice ?? '',
    page: Number(searchParams?.page ?? '1') || 1,
    sort
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Shop Products',
    description: 'Product listing page for the e-commerce dashboard.',
    url: 'https://vrittech-shop.vercel.app/products',
  };
  return (
    <div className="space-y-8">


      <ProductsClient products={products} categories={categories} initialFilters={initialFilters} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
