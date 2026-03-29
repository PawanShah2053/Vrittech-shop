import type { MetadataRoute } from 'next';

import { apiFetch } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import type { Product } from '@/types';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://example.com';
  
  let products: Product[] = [];
  try {
    products = await apiFetch<Product[]>(API_ENDPOINTS.products, {
      next: { revalidate: 3600 }
    });
  } catch (error) {
    // During build, API might not be available. Return minimal sitemap.
    console.warn('Failed to fetch products for sitemap:', error);
  }

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
