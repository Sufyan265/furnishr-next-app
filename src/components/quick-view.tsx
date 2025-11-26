
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import ProductInteraction from '@/components/product-interaction';
import type { Product } from '@/lib/types';
import { Button } from './ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface QuickViewDialogProps {
    product: Product | null;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function QuickViewDialog({ product, isOpen, onOpenChange }: QuickViewDialogProps) {
    if (!product) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl p-0">
                <div className="grid md:grid-cols-2">
                    <div className="md:hidden p-6 border-b">
                         <DialogHeader>
                            <DialogTitle className="font-headline text-2xl">{product.name}</DialogTitle>
                            <DialogDescription>{product.category}</DialogDescription>
                        </DialogHeader>
                    </div>
                    {/* The ProductInteraction component handles images and purchase options */}
                    <div className="p-4 sm:p-6 lg:p-8">
                         <ProductInteraction product={product} />
                         <Button asChild variant="link" className="mt-4">
                            <Link href={`/products/${product.slug}`}>
                                View Full Details
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                         </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
