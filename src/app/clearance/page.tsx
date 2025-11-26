
import { products } from '@/lib/data';
import ProductCard from '@/components/product-card';
import { siteWideSale } from '@/lib/data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Clearance | Furnishr',
  description: 'Grab a bargain with our clearance items. High-quality furniture at discounted prices.',
};

export default function ClearancePage() {
  const clearanceProducts = products.filter(p => p.deal || (siteWideSale.isActive && !['ambassador-park-lane-bed', 'astral-sleigh-bed', 'divan-ottoman-bed'].includes(p.slug)));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Clearance Sale</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Limited stock, unlimited style. Grab these deals before they're gone!
        </p>
      </div>

      {clearanceProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {clearanceProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-muted-foreground">No clearance items available at the moment. Check back soon!</p>
        </div>
      )}
    </div>
  );
}
