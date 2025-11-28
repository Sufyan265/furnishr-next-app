
'use client';

import { products, siteWideSale } from '@/lib/data';
import ProductCard from '@/components/product-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Percent } from 'lucide-react';
import CountdownTimer from '../countdown-timer';

export default function SaleSpotlight() {
    const saleProducts = products.filter(p => p.deal || siteWideSale.isActive).slice(0, 4);

    if (saleProducts.length === 0) {
        return null;
    }

    return (
        <section className="bg-destructive/5 text-destructive">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <Percent className="h-12 w-12 mx-auto" />
                    <h2 className="font-headline text-3xl md:text-4xl font-bold mt-4">Limited Time Offers</h2>
                    <p className="mt-2 text-lg text-destructive/80">Don't miss out on these exclusive deals.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {saleProducts.map((product) => (
                        <ProductCard key={product.id} product={product} onQuickView={() => {}}/>
                    ))}
                </div>
                 <div className="text-center mt-12">
                    <Button asChild variant="destructive">
                        <Link href="/clearance">Shop All Sale Items <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
