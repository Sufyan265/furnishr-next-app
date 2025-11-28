
'use client';

import Image from 'next/image';
import { getImage } from '@/lib/placeholder-images';
import { products } from '@/lib/data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Plus } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import ProductCard from '../product-card';

const look = {
    image: getImage('hero-1'),
    products: [
        { id: '1', position: { top: '60%', left: '40%' } }, // Aokland Sofa
        { id: '27', position: { top: '50%', left: '75%' } }, // Lilly Sofa (as an armchair)
    ],
};


export default function ShopTheLook() {

    const featuredProducts = products.filter(p => look.products.some(fp => fp.id === p.id));

    return (
        <section className="bg-background overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="font-headline text-3xl md:text-4xl font-bold">Shop The Look</h2>
                    <p className="mt-2 text-lg text-muted-foreground">Get inspired and bring this entire look home.</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 items-center">
                    <div className="lg:col-span-2 relative aspect-video rounded-lg overflow-hidden group">
                        <Image
                            src={look.image.imageUrl}
                            alt={look.image.description}
                            data-ai-hint={look.image.imageHint}
                            fill
                            className="object-cover"
                        />
                        <TooltipProvider>
                            {look.products.map(p => {
                                const product = products.find(prod => prod.id === p.id);
                                if (!product) return null;

                                return (
                                    <Tooltip key={p.id}>
                                        <TooltipTrigger asChild>
                                            <Button
                                                asChild
                                                size="icon"
                                                className="absolute rounded-full w-8 h-8 group-hover:scale-110 transition-transform"
                                                style={{ top: p.position.top, left: p.position.left }}
                                            >
                                                <Link href={`/products/${product.slug}`}>
                                                    <Plus className="h-5 w-5" />
                                                </Link>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{product.name}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                );
                            })}
                        </TooltipProvider>
                    </div>
                    <div className="space-y-4">
                        <h3 className="font-headline text-2xl font-bold">Featured Items</h3>
                        {featuredProducts.map(product => (
                             <Link key={product.id} href={`/products/${product.slug}`} className="group block">
                            <Card className="flex items-center gap-4 p-3 transition-shadow hover:shadow-md">
                                <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                                <Image
                                    src={getImage(product.imageIds[0]).imageUrl}
                                    alt={product.name}
                                    data-ai-hint={getImage(product.imageIds[0]).imageHint}
                                    fill
                                    className="object-cover"
                                />
                                </div>
                                <div>
                                    <p className="font-semibold text-sm line-clamp-1 group-hover:text-primary">{product.name}</p>
                                    <p className="text-sm text-muted-foreground">£{product.price.toFixed(2)}</p>
                                </div>
                            </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
