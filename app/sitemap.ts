import type { MetadataRoute } from 'next';

import { apiFetch } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import type { Product } from '@/types';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://example.com';
  const products = await apiFetch<Product[]>(API_ENDPOINTS.products, {
    next: { revalidate: 3600 }
  });

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date()
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date()
    },
    ...products.map((product) => ({
      url: `${baseUrl}/products/${product.id}`,
      lastModified: new Date()
    }))
  ];
}
