import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

import { apiFetch, ApiError } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import { formatCurrency } from '@/lib/utils';
import type { Product } from '@/types';

type ProductDetailPageProps = {
  params: {
    id: string;
  };
};

async function getProduct(id: string) {
  try {
    return await apiFetch<Product>(API_ENDPOINTS.productById(id), {
      next: { revalidate: 300 }
    });
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      notFound();
    }

    throw error;
  }
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const product = await getProduct(params.id);

  return {
    title: product.title,
    description: product.description
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const product = await getProduct(params.id);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    image: product.image,
    description: product.description,
    category: product.category,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: product.price,
      availability: 'https://schema.org/InStock'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating.rate,
      reviewCount: product.rating.count
    }
  };

  return (
    <div className="space-y-8">
      <Link href="/products" className="inline-flex text-sm font-medium text-brand-700">
        ← Back to products
      </Link>

      <section className="grid gap-8 rounded-[32px] border border-slate-200 bg-white p-6 shadow-soft lg:grid-cols-[0.95fr_1.05fr] lg:p-10">
        <div className="relative min-h-[360px] overflow-hidden rounded-[28px] bg-slate-50">
          <Image src={product.image} alt={product.title} fill className="object-contain p-10" priority />
        </div>

        <div>
          <span className="rounded-full bg-brand-50 px-4 py-2 text-sm font-medium text-brand-700">
            {product.category}
          </span>
          <h1 className="mt-5 text-3xl font-bold text-slate-950">{product.title}</h1>
          <div className="mt-4 flex items-center gap-4 text-sm text-slate-500">
            <span>⭐ {product.rating.rate} rating</span>
            <span>{product.rating.count} reviews</span>
          </div>
          <p className="mt-6 text-3xl font-bold text-slate-900">{formatCurrency(product.price)}</p>
          <p className="mt-6 leading-8 text-slate-600">{product.description}</p>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
