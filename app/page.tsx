import ProductsPage from './products/page';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  return (
    <section >
      <div>
       
     <ProductsPage searchParams={{
          category: undefined,
          search: undefined,
          minPrice: undefined,
          maxPrice: undefined,
          page: undefined,
          sort: undefined
        }} />
      </div>

     
    </section>
  );
}
