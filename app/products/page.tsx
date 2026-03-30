import type { Metadata } from 'next';
import { ProductsClient } from '@/components/products/products-client';
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
  description:
    'Browse products with server-side rendering, client-side filters, and persistent cart state.',
};

export const revalidate = 3600;

async function getProducts(sort: 'asc' | 'desc'): Promise<Product[]> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://vrittech-shop.vercel.app';

  const res = await fetch(`${baseUrl}/api/products?sort=${sort}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    return [];
  }

  return res.json();
}

async function getCategories(): Promise<string[]> {
  try {
    const res = await fetch('https://fakestoreapi.com/products/categories', {
      next: { revalidate: 3600 },
    });

    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const sort = searchParams?.sort === 'desc' ? 'desc' : 'asc';

  let products: Product[] = [];
  let categories: string[] = [];

  try {
    [products, categories] = await Promise.all([
      getProducts(sort),
      getCategories(),
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
    sort,
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Shop Products',
    description: 'Product listing page for the e-commerce dashboard.',
    url: 'https://vrittech-shop.vercel.app/products',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductsClient
        products={products}
        categories={categories}
        initialFilters={initialFilters}
      />
    </>
  );
}