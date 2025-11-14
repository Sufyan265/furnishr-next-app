import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Award, Truck, Undo, Sparkles, Feather, ShieldCheck } from 'lucide-react';
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
import { heroImages, getImage } from '@/lib/placeholder-images';

export default function Home() {
  const chooseUsImage = getImage('category-living-room');
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

      <section>
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">Why Choose Furnishr?</h2>
            <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
              We're more than just a furniture store. We're your partner in creating a home you love.
            </p>
          </div>
          <div className="mt-16 grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="grid grid-cols-2 gap-8">
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

      <section className="bg-secondary/50">
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

      <section>
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
