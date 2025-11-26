
"use client";

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Loader2 } from 'lucide-react';
import { searchProducts } from '@/ai/flows/search-flow';
import { products } from '@/lib/data';
import Link from 'next/link';
import Image from 'next/image';
import { getImage } from '@/lib/placeholder-images';

export default function SearchDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<{ id: string; reason: string }[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setHasSearched(true);
    try {
      const response = await searchProducts({ query });
      setResults(response.results);
    } catch (error) {
      console.error("Search failed:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const foundProducts = results.map(result => {
    const product = products.find(p => p.id === result.id);
    return product ? { ...product, reason: result.reason } : null;
  }).filter(Boolean);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Search className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">Search for Products</DialogTitle>
          <DialogDescription>
            Use natural language to find what you're looking for. Try "a comfy blue sofa" or "a bed with storage".
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSearch} className="flex items-center space-x-2">
          <Input
            placeholder="e.g., modern velvet armchair for a small living room..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="text-base"
          />
          <Button type="submit" disabled={isLoading} size="icon">
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          </Button>
        </form>
        <div className="mt-4 min-h-[300px] max-h-[60vh] overflow-y-auto pr-2">
            {isLoading ? (
                <div className="flex items-center justify-center h-full">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
            ) : hasSearched ? (
                 foundProducts.length > 0 ? (
                    <div className="space-y-4">
                        {foundProducts.map((product) => product && (
                        <Link
                            key={product.id}
                            href={`/products/${product.slug}`}
                            className="flex items-center gap-4 p-2 rounded-lg hover:bg-secondary transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            <div className="relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden">
                            <Image
                                src={getImage(product.imageIds[0]).imageUrl}
                                alt={product.name}
                                fill
                                className="object-cover"
                            />
                            </div>
                            <div className="flex-grow">
                                <h4 className="font-semibold">{product.name}</h4>
                                <p className="text-sm text-muted-foreground italic">"{product.reason}"</p>
                            </div>
                        </Link>
                        ))}
                    </div>
                 ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <Search className="h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-4 font-semibold">No results found</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                            We couldn't find any products matching your search. Please try a different query.
                        </p>
                    </div>
                 )
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">
                     <Search className="h-12 w-12 text-muted-foreground" />
                     <h3 className="mt-4 font-semibold">Find your perfect piece</h3>
                     <p className="mt-1 text-sm text-muted-foreground">
                        Start typing above to search our product catalog.
                     </p>
                </div>
            )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
