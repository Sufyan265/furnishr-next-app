
'use client';

import { useState, useMemo } from 'react';
import { notFound } from 'next/navigation';
import { getProductBySlug, getReviewsForProduct } from '@/lib/data';
import { Separator } from '@/components/ui/separator';
import ProductInteraction from '@/components/product-interaction';
import StarRating from '@/components/star-rating';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ShieldCheck, Truck, PackageCheck, Lock, ShieldAlert, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import ProductQandA from '@/components/product-q-and-a';
import { doc, updateDoc, increment } from 'firebase/firestore';
import { useFirestore } from '@/firebase';

// Since we are converting to a client component, we can no longer export metadata directly.
// This would typically be handled in a parent server component or layout, but for this standalone page,
// we will manage the title dynamically on the client.

type ProductPageProps = {
  params: { slug: string };
};

const reviewTags = ['comfort', 'assembly', 'delivery', 'quality'];

export default function ProductDetailPage({ params }: ProductPageProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const firestore = useFirestore();
  
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }
  
  // Set document title on client
  if (typeof window !== 'undefined') {
    document.title = `${product.name} | Furnishr`;
  }

  const reviews = getReviewsForProduct(product.id);

  const filteredReviews = useMemo(() => {
    if (selectedTags.length === 0) {
      return reviews;
    }
    return reviews.filter(review => 
      selectedTags.every(tag => review.tags?.includes(tag))
    );
  }, [reviews, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleVote = (reviewId: string, voteType: 'upvotes' | 'downvotes') => {
    if (!firestore) return;
    const reviewRef = doc(firestore, 'products', product.id, 'reviews', reviewId);
    updateDoc(reviewRef, {
        [voteType]: increment(1)
    }).catch(err => console.error("Failed to vote:", err));
  }

  return (
    <div className="bg-secondary/30">
      <section className="container mx-auto px-4 py-8 md:py-16">
        <ProductInteraction product={product} />

        <div className="grid md:grid-cols-3 gap-12 mt-12">
          <div className="md:col-span-2 space-y-12">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Product Details</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
                <Separator className="my-6" />
                <div className="grid sm:grid-cols-2 gap-x-6 gap-y-8">
                  <div>
                    <h3 className="font-semibold mb-3">Features</h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      {product.details.map((detail, i) => <li key={i}>{detail}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3">Dimensions</h3>
                    <div className="space-y-1 text-muted-foreground">
                      <p><strong>Width:</strong> {product.dimensions.width}</p>
                      <p><strong>Height:</strong> {product.dimensions.height}</p>
                      <p><strong>Depth:</strong> {product.dimensions.depth}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div>
              <div className="text-center mb-8">
                <h2 className="font-headline text-3xl font-bold">Customer Reviews</h2>
                <div className="mt-4 flex justify-center gap-2 flex-wrap">
                  {reviewTags.map(tag => (
                    <Button 
                      key={tag}
                      variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                      onClick={() => toggleTag(tag)}
                      className="capitalize"
                    >
                      {tag}
                    </Button>
                  ))}
                </div>
              </div>
              {filteredReviews.length > 0 ? (
                <div className="grid sm:grid-cols-2 gap-6">
                  {filteredReviews.map(review => (
                    <Card key={review.id} className="flex flex-col">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold">{review.author}</p>
                              <p className="text-xs text-muted-foreground">{new Date(review.date).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <StarRating rating={review.rating} />
                        </div>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <h3 className="font-semibold mb-2">{review.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">"{review.comment}"</p>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center bg-secondary/30 p-3">
                        <p className="text-xs text-muted-foreground">Was this review helpful?</p>
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleVote(review.id, 'upvotes')}>
                                <ThumbsUp className="h-4 w-4" />
                            </Button>
                            <span className="text-sm font-semibold">{review.upvotes || 0}</span>
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleVote(review.id, 'downvotes')}>
                                <ThumbsDown className="h-4 w-4" />
                            </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  {reviews.length > 0 ? 'No reviews match the selected filters.' : "This product doesn't have any reviews yet."}
                </p>
              )}
            </div>

            <ProductQandA productId={product.id} />

          </div>
          <div className="space-y-6 md:sticky md:top-24 h-fit">
              <Card className="bg-card">
                  <CardContent className="p-6 space-y-4">
                       <div className="flex items-center gap-4">
                          <Truck className="h-8 w-8 text-primary" />
                          <div>
                              <h4 className="font-semibold">Free UK Delivery</h4>
                              <p className="text-sm text-muted-foreground">On orders over £250.</p>
                          </div>
                      </div>
                      <Separator/>
                       <div className="flex items-center gap-4">
                          <PackageCheck className="h-8 w-8 text-primary" />
                          <div>
                              <h4 className="font-semibold">Hassle-Free Returns</h4>
                              <p className="text-sm text-muted-foreground">30-day return policy.</p>
                          </div>
                      </div>
                      <Separator/>
                      <div className="flex items-center gap-4">
                          <ShieldCheck className="h-8 w-8 text-primary" />
                          <div>
                              <h4 className="font-semibold">Quality Guarantee</h4>
                              <p className="text-sm text-muted-foreground">Built to last with quality materials.</p>
                          </div>
                      </div>
                      <Separator/>
                      <div className="flex items-center gap-4">
                          <Lock className="h-8 w-8 text-primary" />
                          <div>
                              <h4 className="font-semibold">Secure Checkout</h4>
                              <p className="text-sm text-muted-foreground">100% secure payments.</p>
                          </div>
                      </div>
                      <Separator/>
                      <div className="flex items-center gap-4">
                          <ShieldAlert className="h-8 w-8 text-primary" />
                          <div>
                              <h4 className="font-semibold">Verified Reviews</h4>
                              <p className="text-sm text-muted-foreground">Authentic feedback from our customers.</p>
                          </div>
                      </div>
                  </CardContent>
              </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
