
"use client";

import { useState } from 'react';
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
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import { getImage } from '@/lib/placeholder-images';

export default function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const [view, setView] = useState('grid');
  const selectedCategory = searchParams.category as string | undefined;

  const filteredProducts = selectedCategory
    ? products.filter(p => p.categorySlug === selectedCategory)
    : products;

  return (
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
               <Select>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
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
          
          {view === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
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
                            <Button asChild>
                                <Link href={`/products/${product.slug}`}>View Details</Link>
                            </Button>
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
  );
}
