
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Award, Truck, ShieldCheck, Feather, Globe, Bed, Sofa, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { categories, reviews, products } from '@/lib/data';
import ProductCard from '@/components/product-card';
import { heroImages, getImage, worldMapImage, categoryImages } from '@/lib/placeholder-images';
import StarRating from '@/components/star-rating';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import FeaturedProducts from '@/components/home/featured-products';
import NewArrivals from '@/components/home/new-arrivals';
import ShopTheLook from '@/components/home/shop-the-look';
import Craftsmanship from '@/components/home/craftsmanship';
import BlogSection from '@/components/home/blog-section';
import NewsletterSignup from '@/components/home/newsletter-signup';
import SaleSpotlight from '@/components/home/sale-spotlight';
import AuthDialog from '@/components/auth-dialog';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function AuthDialogWrapper() {
  const [isAuthDialogOpen, setAuthDialogOpen] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get('auth') === 'login') {
      setAuthDialogOpen(true);
    }
  }, [searchParams]);

  return <AuthDialog open={isAuthDialogOpen} onOpenChange={setAuthDialogOpen} />;
}

export default function Home() {
  const chooseUsImage = categoryImages['living-room'];
  
  const sofaProductIds = products.filter(p => p.categorySlug === 'sofas').map(p => p.id);
  const sofaReviews = reviews.filter(r => sofaProductIds.includes(r.productId)).sort((a,b) => b.rating - a.rating).slice(0, 5);

  const bedProductIds = products.filter(p => p.categorySlug === 'beds').map(p => p.id);
  const bedReviews = reviews.filter(r => bedProductIds.includes(r.productId)).sort((a,b) => b.rating - a.rating).slice(0, 5);

  const bedroomProducts = products.filter(p => p.categorySlug === 'beds').slice(0, 4);
  const sofaProducts = products.filter(p => p.categorySlug === 'sofas').slice(0, 4);
  
  const instagramPosts = [
    { id: 1, imageId: "product-sofa-8" },
    { id: 2, imageId: "product-bed-ambassador-1" },
    { id: 3, imageId: "product-sofa-2" },
    { id: 4, imageId: "product-bed-sleigh-1" },
    { id: 5, imageId: "product-sofa-3" },
    { id: 6, imageId: "product-bed-divan-1" },
  ];

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <section className="w-full pt-0">
        <Carousel className="w-full" opts={{ loop: true }} plugins={[
          // Autoplay({ delay: 5000, stopOnInteraction: true })
        ]}>
          <CarouselContent>
            {heroImages.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative h-[60vh] md:h-[80vh] w-full">
                  <Image
                    src={image.imageUrl}
                    alt={image.description}
                    data-ai-hint={image.imageHint}
                    fill
                    className="object-cover ken-burns"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="container mx-auto px-4 text-center text-white">
                      <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight drop-shadow-lg fade-in">
                        Design Your Dream Space
                      </h1>
                      <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl fade-in" style={{ animationDelay: '0.5s' }}>
                        Discover curated furniture collections that blend style, comfort, and quality.
                      </p>
                      <Button asChild size="lg" className="mt-8 font-bold fade-in" style={{ animationDelay: '1s' }}>
                        <Link href="/products">Shop New Arrivals</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 border-none" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 border-none" />
        </Carousel>
      </section>

      <section>
        <div className="container mx-auto px-4">
           <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Shop by Category</h2>
            <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
              Find the perfect pieces for every room in your home.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => (
              <Link key={category.id} href={`/products?category=${category.slug}`} className="group block">
                <div className="relative aspect-square rounded-lg overflow-hidden">
                   <Image
                    src={category.imageUrl}
                    alt={category.name}
                    data-ai-hint={category.imageHint}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="font-headline text-2xl font-bold text-white drop-shadow-md">{category.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FeaturedProducts />

      <ShopTheLook />

      <section>
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Why Choose Furnishr?</h2>
            <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
              We're more than just a furniture store. We're your partner in creating a home you love.
            </p>
          </div>
          <div className="mt-12 md:mt-16 grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <Card className="bg-secondary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <CardContent className="p-6 text-center flex flex-col items-center gap-3">
                    <Award className="h-10 w-10 text-primary" />
                    <h3 className="font-headline text-xl font-semibold">Timeless Design</h3>
                    <p className="text-muted-foreground text-sm">Contemporary and enduring pieces that transcend trends.</p>
                  </CardContent>
                </Card>
                <Card className="bg-secondary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <CardContent className="p-6 text-center flex flex-col items-center gap-3">
                    <ShieldCheck className="h-10 w-10 text-primary" />
                    <h3 className="font-headline text-xl font-semibold">Unmatched Quality</h3>
                    <p className="text-muted-foreground text-sm">Built to last with the finest materials and craftsmanship.</p>
                  </CardContent>
                </Card>
                <Card className="bg-secondary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <CardContent className="p-6 text-center flex flex-col items-center gap-3">
                    <Feather className="h-10 w-10 text-primary" />
                    <h3 className="font-headline text-xl font-semibold">Sustainable Choice</h3>
                    <p className="text-muted-foreground text-sm">Responsibly sourced materials for a healthier planet.</p>
                  </CardContent>
                </Card>
                <Card className="bg-secondary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <CardContent className="p-6 text-center flex flex-col items-center gap-3">
                    <Truck className="h-10 w-10 text-primary" />
                    <h3 className="font-headline text-xl font-semibold">Exceptional Service</h3>
                    <p className="text-muted-foreground text-sm">Free delivery & hassle-free returns for your peace of mind.</p>
                  </CardContent>
                </Card>
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl animate-float">
              <Image
                src={chooseUsImage.imageUrl}
                alt={chooseUsImage.description}
                data-ai-hint={chooseUsImage.imageHint}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <NewArrivals />
      <SaleSpotlight />

      <section>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Bed className="h-12 w-12 mx-auto text-primary" />
            <h2 className="font-headline text-3xl md:text-4xl font-bold mt-4">Sweet Dreams Collection</h2>
            <p className="mt-2 text-lg text-muted-foreground">Curated for your perfect sanctuary.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {bedroomProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {bedReviews.length > 0 && (
             <div className="mt-16">
                <h3 className="font-headline text-2xl font-bold text-center mb-8">Hear from our Happy Sleepers</h3>
                <Carousel opts={{ align: "start", loop: true }} className="w-full max-w-4xl mx-auto">
                    <CarouselContent>
                        {bedReviews.map((review) => (
                            <CarouselItem key={review.id} className="md:basis-1/2 lg:basis-1/3">
                                <Card className="h-full flex flex-col justify-between">
                                    <CardHeader>
                                        <div className="flex items-center gap-4">
                                            <Avatar>
                                                <AvatarFallback>
                                                    <User className="h-5 w-5" />
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-semibold">{review.author}</p>
                                                <StarRating rating={review.rating} />
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <blockquote className="text-muted-foreground italic line-clamp-4">"{review.comment}"</blockquote>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="-left-4" />
                    <CarouselNext className="-right-4" />
                </Carousel>
            </div>
          )}
          <div className="text-center mt-12">
            <Button asChild>
              <Link href="/products?category=beds">Shop All Beds <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
      
       <section className="bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Sofa className="h-12 w-12 mx-auto text-primary" />
            <h2 className="font-headline text-3xl md:text-4xl font-bold mt-4">Ultimate Comfort Sofas</h2>
            <p className="mt-2 text-lg text-muted-foreground">Discover the perfect centerpiece for your living room.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {sofaProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {sofaReviews.length > 0 && (
             <div className="mt-16">
                <h3 className="font-headline text-2xl font-bold text-center mb-8">What Our Customers are Saying</h3>
                <Carousel opts={{ align: "start", loop: true }} className="w-full max-w-4xl mx-auto">
                    <CarouselContent>
                        {sofaReviews.map((review) => (
                            <CarouselItem key={review.id} className="md:basis-1/2 lg:basis-1/3">
                                <Card className="h-full flex flex-col justify-between">
                                    <CardHeader>
                                        <div className="flex items-center gap-4">
                                            <Avatar>
                                                <AvatarFallback>
                                                    <User className="h-5 w-5" />
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-semibold">{review.author}</p>
                                                <StarRating rating={review.rating} />
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <blockquote className="text-muted-foreground italic line-clamp-4">"{review.comment}"</blockquote>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="-left-4" />
                    <CarouselNext className="-right-4" />
                </Carousel>
            </div>
          )}
          <div className="text-center mt-12">
            <Button asChild>
              <Link href="/products?category=sofas">Shop All Sofas <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      <Craftsmanship />

      <section>
        <div className="container mx-auto px-4">
           <div className="text-center mb-12">
             <h2 className="font-headline text-3xl md:text-4xl font-bold">#FurnishrAtHome</h2>
             <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
               Get inspired by our community. See how our furniture looks in real homes.
             </p>
           </div>
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {instagramPosts.map(post => {
                  const image = getImage(post.imageId);
                  return (
                      <div key={post.id} className="group relative aspect-square rounded-lg overflow-hidden">
                          <Image 
                              src={image.imageUrl}
                              alt={image.description}
                              data-ai-hint={image.imageHint}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                           <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                              <p className="text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity">@furnishr</p>
                          </div>
                      </div>
                  )
              })}
           </div>
           <div className="text-center mt-12">
            <Button variant="outline">Follow us on Instagram</Button>
           </div>
        </div>
      </section>
      
      <BlogSection />

      <section className="bg-secondary/30">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="font-headline text-4xl font-bold">Ready to Find Your Perfect Piece?</h2>
          <p className="mt-4 text-xl text-muted-foreground max-w-xl mx-auto">
            Browse our curated collections and discover furniture that speaks to your style.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/products">Explore All Collections</Link>
          </Button>
        </div>
      </section>


      <section className="bg-secondary/50">
        <div className="container mx-auto px-4 text-center">
          <Globe className="h-12 w-12 mx-auto text-primary" />
          <h2 className="font-headline text-3xl md:text-4xl font-bold mt-4">Loved Worldwide</h2>
          <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
            From London to Los Angeles, our designs are cherished in homes across the globe.
          </p>
          <div className="relative max-w-5xl mx-auto mt-12">
            <Image
              src={worldMapImage.imageUrl}
              alt={worldMapImage.description}
              data-ai-hint={worldMapImage.imageHint}
              width={1200}
              height={600}
              className="w-full h-auto object-contain"
            />
            {/* Example pulsing dots */}
            <div className="pulsing-dot" style={{ top: '35%', left: '48%', animationDelay: '0s' }}></div>
            <div className="pulsing-dot" style={{ top: '40%', left: '20%', animationDelay: '0.5s' }}></div>
            <div className="pulsing-dot" style={{ top: '65%', left: '80%', animationDelay: '1s' }}></div>
            <div className="pulsing-dot" style={{ top: '70%', left: '55%', animationDelay: '1.5s' }}></div>
            <div className="pulsing-dot" style={{ top: '25%', left: '90%', animationDelay: '0.2s' }}></div>
            <div className="pulsing-dot" style={{ top: '50%', left: '10%', animationDelay: '1.8s' }}></div>
            <div className="pulsing-dot" style={{ top: '20%', left: '65%', animationDelay: '0.8s' }}></div>
            <div className="pulsing-dot" style={{ top: '80%', left: '30%', animationDelay: '1.2s' }}></div>
          </div>
        </div>
      </section>

      <NewsletterSignup />

      <Suspense fallback={null}>
        <AuthDialogWrapper />
      </Suspense>
    </div>
  );
}
