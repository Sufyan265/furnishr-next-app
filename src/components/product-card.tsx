
"use client"

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import type { Product } from '@/lib/types';
import { Button } from './ui/button';
import { Heart, Eye } from 'lucide-react';
import { getImage } from '@/lib/placeholder-images';
import { useWishlist } from '@/context/wishlist-context';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  onQuickView?: () => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const primaryImage = getImage(product.imageIds[0]);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const inWishlist = isInWishlist(product.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) {
      onQuickView();
    }
  };
  
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
      <CardHeader className="p-0 relative">
        <Link href={`/products/${product.slug}`} className="block">
          <Image
            src={primaryImage.imageUrl} 
            alt={product.name}
            data-ai-hint={primaryImage.imageHint}
            width={500}
            height={500}
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        <div className="absolute top-2 right-2 flex flex-col gap-2">
            <Button 
                variant="ghost" 
                size="icon" 
                className="bg-background/70 hover:bg-background rounded-full h-8 w-8"
                onClick={handleWishlistClick}
                aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            >
            <Heart className={cn("h-4 w-4 text-muted-foreground", inWishlist && "fill-destructive text-destructive")} />
            </Button>
            {onQuickView && (
             <Button 
                variant="ghost" 
                size="icon" 
                className="bg-background/70 hover:bg-background rounded-full h-8 w-8"
                onClick={handleQuickViewClick}
                aria-label="Quick view"
            >
              <Eye className="h-4 w-4 text-muted-foreground" />
            </Button>
            )}
        </div>

      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <p className="text-sm text-muted-foreground">{product.category}</p>
        <CardTitle className="mt-1 text-lg font-headline">
          <Link href={`/products/${product.slug}`}>{product.name}</Link>
        </CardTitle>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <p className="text-lg font-semibold">£{product.price.toFixed(2)}</p>
        <Button asChild variant="outline">
          <Link href={`/products/${product.slug}`}>View</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
