import type { MetadataRoute } from 'next';

export const revalidate = 3600;

type Product = {
  id: number | string;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://vrittech-shop.vercel.app';

  let products: Product[] = [];

  try {
    const res = await fetch('https://fakestoreapi.com/products', {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status}`);
    }

    products = await res.json();
  } catch (error) {
    console.warn('Failed to fetch products for sitemap:', error);
  }

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
    },
    ...products.map((product) => ({
      url: `${baseUrl}/products/${product.id}`,
      lastModified: new Date(),
    })),
  ];
}