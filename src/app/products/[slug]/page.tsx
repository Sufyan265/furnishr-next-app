
import { notFound } from 'next/navigation';
import { getProductBySlug, getReviewsForProduct } from '@/lib/data';
import { Separator } from '@/components/ui/separator';
import ProductInteraction from '@/components/product-interaction';
import StarRating from '@/components/star-rating';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ShieldCheck, Truck, PackageCheck, Lock, ShieldAlert } from 'lucide-react';
import type { Metadata } from 'next';

type ProductPageProps = {
  params: { slug: string };
};

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = getProductBySlug(params.slug);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: `${product.name} | Furnishr`,
    description: product.description,
  };
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const reviews = getReviewsForProduct(product.id);

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
              <h2 className="font-headline text-3xl font-bold mb-8 text-center">Customer Reviews</h2>
              {reviews.length > 0 ? (
                <div className="grid sm:grid-cols-2 gap-6">
                  {reviews.map(review => (
                    <Card key={review.id}>
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
                      <CardContent>
                        <h3 className="font-semibold mb-2">{review.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">"{review.comment}"</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground">This product doesn't have any reviews yet.</p>
              )}
            </div>

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
