import Image from 'next/image';
import { aboutImage } from '@/lib/placeholder-images';
import { Award, Feather, Sparkles } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Furnishr',
  description: 'Learn about Furnishr\'s mission to bring high-quality, stylish, and sustainable furniture to homes across the UK.',
};

export default function AboutPage() {
  return (
    <div>
      <section className="relative h-[50vh] bg-secondary/30 flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src={aboutImage.imageUrl}
            alt={aboutImage.description}
            data-ai-hint={aboutImage.imageHint}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="relative container mx-auto px-4 text-center text-white">
          <h1 className="font-headline text-4xl md:text-6xl font-bold">Our Story</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg">Crafting homes, not just furniture.</p>
        </div>
      </section>

      <section>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-headline text-3xl font-bold text-center">The Furnishr Mission</h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              At Furnishr, we believe that your home should be a sanctuary. A place that reflects your personality, brings you comfort, and inspires you daily. Founded in the heart of the UK, our mission is to make beautiful, high-quality design accessible to everyone. We meticulously source and design furniture that is not only stylish but also built to last, creating timeless pieces that you'll cherish for years to come.
            </p>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              We're passionate about craftsmanship, sustainability, and exceptional customer service. From the initial design sketch to the final delivery at your doorstep, we're committed to providing an experience that's as seamless and enjoyable as the furniture we sell.
            </p>
          </div>
        </div>
      </section>
      
      <section className="bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl font-bold">Our Core Values</h2>
            <p className="mt-2 text-lg text-muted-foreground">The principles that guide us.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <Award className="h-12 w-12 text-primary mb-4" />
              <h3 className="font-headline text-2xl font-semibold">Uncompromising Quality</h3>
              <p className="mt-2 text-muted-foreground">We use only the finest materials and partner with skilled artisans to ensure every piece meets our exacting standards.</p>
            </div>
            <div className="flex flex-col items-center">
              <Sparkles className="h-12 w-12 text-primary mb-4" />
              <h3 className="font-headline text-2xl font-semibold">Timeless Design</h3>
              <p className="mt-2 text-muted-foreground">Our collections are designed to be both contemporary and enduring, transcending fleeting trends to bring lasting style to your home.</p>
            </div>
            <div className="flex flex-col items-center">
              <Feather className="h-12 w-12 text-primary mb-4" />
              <h3 className="font-headline text-2xl font-semibold">Sustainable Practices</h3>
              <p className="mt-2 text-muted-foreground">We are committed to responsible sourcing and environmentally-friendly practices, because we care about our planet's future.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
