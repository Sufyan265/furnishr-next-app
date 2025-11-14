import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Award, Truck, Undo } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { categories, featuredProducts } from '@/lib/data';
import ProductCard from '@/components/product-card';
import { heroImages } from '@/lib/placeholder-images';

export default function Home() {
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
                    className="object-cover"
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

      <section className="bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Truck className="h-10 w-10 text-primary" />
              <h3 className="mt-4 font-headline text-xl font-semibold">Free UK Delivery</h3>
              <p className="mt-2 text-muted-foreground">On all orders over £250. No fuss.</p>
            </div>
            <div className="flex flex-col items-center">
              <Award className="h-10 w-10 text-primary" />
              <h3 className="mt-4 font-headline text-xl font-semibold">Quality Craftsmanship</h3>
              <p className="mt-2 text-muted-foreground">Built to last with the finest materials.</p>
            </div>
            <div className="flex flex-col items-center">
              <Undo className="h-10 w-10 text-primary" />
              <h3 className="mt-4 font-headline text-xl font-semibold">Hassle-Free Returns</h3>
              <p className="mt-2 text-muted-foreground">30-day return policy for peace of mind.</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Featured Products</h2>
            <p className="mt-2 text-lg text-muted-foreground">Handpicked for you, loved by many.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link href="/products">View All Products <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Shop by Category</h2>
            <p className="mt-2 text-lg text-muted-foreground">Find the perfect pieces for every room.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => (
              <Link key={category.id} href={`/products?category=${category.slug}`} className="group relative block">
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <Image
                      src={category.imageUrl}
                      alt={category.name}
                      data-ai-hint={category.imageHint}
                      width={400}
                      height={500}
                      className="object-cover w-full h-80 transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6">
                      <h3 className="font-headline text-2xl font-bold text-white">{category.name}</h3>
                      <p className="text-white/80 mt-1">Explore Collection</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
