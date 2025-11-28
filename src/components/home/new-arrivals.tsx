
'use client';

import { products } from '@/lib/data';
import ProductCard from '@/components/product-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function NewArrivals() {
    // Simple logic to get the latest products
    const newArrivals = [...products].sort((a, b) => parseInt(b.id) - parseInt(a.id)).slice(0, 4);

    return (
        <section className="bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <Sparkles className="h-12 w-12 mx-auto text-primary" />
                    <h2 className="font-headline text-3xl md:text-4xl font-bold mt-4">New Arrivals</h2>
                    <p className="mt-2 text-lg text-muted-foreground">Check out the latest additions to our collection.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {newArrivals.map((product) => (
                        <ProductCard key={product.id} product={product} onQuickView={() => {}}/>
                    ))}
                </div>
                 <div className="text-center mt-12">
                    <Button asChild variant="outline">
                        <Link href="/products?sort=newest">View All New Items</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
