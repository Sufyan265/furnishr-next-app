"use client";

import Link from 'next/link';
import { useWishlist } from '@/context/wishlist-context';
import ProductCard from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { Heart, ArrowLeft } from 'lucide-react';

export default function WishlistPage() {
  const { wishlist } = useWishlist();

  return (
    <div className="bg-secondary/30 min-h-screen">
        <section className="container mx-auto px-4">
            {wishlist.length === 0 ? (
                <div className="text-center">
                    <Heart className="mx-auto h-24 w-24 text-muted-foreground" />
                    <h1 className="mt-8 font-headline text-4xl font-bold">Your Wishlist is Empty</h1>
                    <p className="mt-4 text-lg text-muted-foreground">
                        You haven't saved any items yet. Start exploring to find furniture you love!
                    </p>
                    <Button asChild size="lg" className="mt-8">
                        <Link href="/products">
                            <ArrowLeft className="mr-2 h-5 w-5" />
                            Continue Shopping
                        </Link>
                    </Button>
                </div>
            ) : (
                <div>
                    <div className="max-w-3xl mx-auto text-center mb-12">
                        <h1 className="font-headline text-4xl md:text-5xl font-bold">Your Wishlist</h1>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Your curated collection of favorite items.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {wishlist.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            )}
        </section>
    </div>
  );
}
