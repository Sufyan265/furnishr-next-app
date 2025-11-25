import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Award, Truck, Undo, Sparkles, Feather, ShieldCheck, Globe, Bed, Sofa } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { categories, featuredProducts, reviews, products } from '@/lib/data';
import ProductCard from '@/components/product-card';
import { heroImages, getImage, worldMapImage } from '@/lib/placeholder-images';
import StarRating from '@/components/star-rating';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function Home() {
  const chooseUsImage = getImage('category-living-room');
  const featuredReviews = reviews.filter(r => r.rating >= 4.5).slice(0, 3);
  const bedroomProducts = products.filter(p => p.categorySlug === 'beds').slice(0, 4);
  const sofaProducts = products.filter(p => p.categorySlug === 'sofas').slice(0, 4);

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <section className="w-full pt-0">
        <Carousel className="w-full" opts={{ loop: true }}>
          <CarouselContent>
            {heroImages.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative h-[60vh] md:h-[80vh] w-full">
                  <Image
                    src={image.imageUrl}
                    alt={image.description}
                    data-ai-hint={image.imageHint}
                    fill
                    className="object-cover w-full h-full ken-burns"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="container mx-auto px-4 text-center text-white">
                      <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight drop-shadow-lg">
                        Design Your Dream Space
                      </h1>
                      <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl">
                        Discover curated furniture collections that blend style, comfort, and quality.
                      </p>
                      <Button asChild size="lg" className="mt-8 font-bold">
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
          <div className="text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Why Choose Furnishr?</h2>
            <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
              We're more than just a furniture store. We're your partner in creating a home you love.
            </p>
          </div>
          <div className="mt-16 grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <Card className="bg-secondary/50">
                  <CardContent className="p-6 text-center flex flex-col items-center gap-3">
                    <Award className="h-10 w-10 text-primary" />
                    <h3 className="font-headline text-xl font-semibold">Timeless Design</h3>
                    <p className="text-muted-foreground text-sm">Contemporary and enduring pieces that transcend trends.</p>
                  </CardContent>
                </Card>
                <Card className="bg-secondary/50">
                  <CardContent className="p-6 text-center flex flex-col items-center gap-3">
                    <ShieldCheck className="h-10 w-10 text-primary" />
                    <h3 className="font-headline text-xl font-semibold">Unmatched Quality</h3>
                    <p className="text-muted-foreground text-sm">Built to last with the finest materials and craftsmanship.</p>
                  </CardContent>
                </Card>
                <Card className="bg-secondary/50">
                  <CardContent className="p-6 text-center flex flex-col items-center gap-3">
                    <Feather className="h-10 w-10 text-primary" />
                    <h3 className="font-headline text-xl font-semibold">Sustainable Choice</h3>
                    <p className="text-muted-foreground text-sm">Responsibly sourced materials for a healthier planet.</p>
                  </CardContent>
                </Card>
                <Card className="bg-secondary/50">
                  <CardContent className="p-6 text-center flex flex-col items-center gap-3">
                    <Truck className="h-10 w-10 text-primary" />
                    <h3 className="font-headline text-xl font-semibold">Exceptional Service</h3>
                    <p className="text-muted-foreground text-sm">Free delivery & hassle-free returns for your peace of mind.</p>
                  </CardContent>
                </Card>
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
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
          <div className="text-center mt-12">
            <Button asChild>
              <Link href="/products?category=sofas">Shop All Sofas <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

       <section>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">What Our Customers Say</h2>
            <p className="mt-2 text-lg text-muted-foreground">Real stories from happy homeowners.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredReviews.map((review) => (
              <Card key={review.id} className="flex flex-col justify-between">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar>
                        <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold">{review.author}</p>
                        <StarRating rating={review.rating} />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <blockquote className="text-muted-foreground italic">"{review.comment}"</blockquote>
                </CardContent>
              </Card>
            ))}
          </div>
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
          </div>
        </div>
      </section>

    </div>
  );
}
