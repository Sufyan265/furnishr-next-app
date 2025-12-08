
"use client";

import { use, useState, useMemo } from 'react';
import { products, categories } from '@/lib/data';
import ProductCard from '@/components/product-card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button';
import { LayoutGrid, List } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getImage } from '@/lib/placeholder-images';
import QuickViewDialog from '@/components/quick-view';
import { Product } from '@/lib/types';

export default function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const [view, setView] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const resolvedSearchParams = use(searchParams);
  const selectedCategory = resolvedSearchParams.category as string | undefined;

  const filteredProducts = useMemo(() => {
    let tempProducts = selectedCategory
      ? products.filter(p => p.categorySlug === selectedCategory)
      : products;
    
    // Sorting logic
    switch (sortBy) {
        case 'price-asc':
            tempProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            tempProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating-desc':
            tempProducts.sort((a, b) => b.rating - a.rating);
            break;
        case 'newest':
            // Assuming higher ID is newer
            tempProducts.sort((a, b) => parseInt(b.id) - parseInt(a.id));
            break;
        case 'featured': // Best Sellers
        default:
            tempProducts.sort((a, b) => b.reviewCount - a.reviewCount);
            break;
    }

    return tempProducts;
  }, [selectedCategory, sortBy]);
  

  return (
    <>
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">
          {selectedCategory
            ? categories.find(c => c.slug === selectedCategory)?.name
            : 'All Sofas & Beds'}
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Discover our curated collection of fine furniture.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
        <main className="w-full">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
            <p className="text-muted-foreground text-sm">{filteredProducts.length} products</p>
            <div className="flex items-center gap-2">
               <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Best Sellers</SelectItem>
                  <SelectItem value="newest">Newest Arrivals</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="rating-desc">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-1 border p-1 rounded-md">
                <Button variant={view === 'grid' ? 'secondary' : 'ghost'} size="icon" onClick={() => setView('grid')}>
                    <LayoutGrid className="h-5 w-5"/>
                </Button>
                <Button variant={view === 'list' ? 'secondary' : 'ghost'} size="icon" onClick={() => setView('list')}>
                    <List className="h-5 w-5"/>
                </Button>
              </div>
            </div>
          </div>
          
          {filteredProducts.length === 0 ? (
             <div className="text-center py-16">
                <p className="text-xl text-muted-foreground">No products match your current filters.</p>
             </div>
          ) : view === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} onQuickView={() => setQuickViewProduct(product)} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProducts.map((product) => {
                const image = getImage(product.imageIds[0]);
                return (
                  <div key={product.id} className="grid grid-cols-1 md:grid-cols-4 gap-6 border p-4 rounded-lg bg-card text-card-foreground shadow-sm">
                    <div className="relative aspect-video md:aspect-square">
                      <Image 
                        src={image.imageUrl}
                        alt={product.name}
                        data-ai-hint={image.imageHint}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="md:col-span-3 flex flex-col">
                        <p className="text-sm text-muted-foreground">{product.category}</p>
                        <h2 className="font-headline text-2xl font-semibold mt-1">
                          <Link href={`/products/${product.slug}`}>{product.name}</Link>
                        </h2>
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2 flex-grow">
                          {product.description}
                        </p>
                        <div className="flex justify-between items-center mt-4">
                            <p className="text-xl font-semibold">£{product.price.toFixed(2)}</p>
                            <div className="flex gap-2">
                                <Button variant="outline" onClick={() => setQuickViewProduct(product)}>Quick View</Button>
                                <Button asChild>
                                    <Link href={`/products/${product.slug}`}>View Details</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </main>
      </div>
    </div>
    <QuickViewDialog
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onOpenChange={(isOpen) => {
            if (!isOpen) {
                setQuickViewProduct(null);
            }
        }}
    />
    </>
  );
}
