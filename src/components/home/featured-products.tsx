
'use client';

import { products } from '@/lib/data';
import ProductCard from '@/components/product-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function FeaturedProducts() {
    const featuredProducts = products.filter(p => p.rating > 4.8).slice(0, 4);

    return (
        <section className="bg-secondary/50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="font-headline text-3xl md:text-4xl font-bold">Featured Products</h2>
                    <p className="mt-2 text-lg text-muted-foreground">Handpicked for you, loved by our customers.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featuredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} onQuickView={() => {}} />
                    ))}
                </div>
                <div className="text-center mt-12">
                    <Button asChild>
                        <Link href="/products">Shop All Products <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
