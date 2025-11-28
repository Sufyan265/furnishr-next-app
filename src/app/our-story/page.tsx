
import Image from 'next/image';
import { aboutImage } from '@/lib/placeholder-images';
import { Award, Feather, Sparkles } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Story | Furnishr',
  description: 'Discover the journey of Furnishr, from a small workshop to a leading name in quality home furniture.',
};

export default function OurStoryPage() {
  return (
    <div>
      <section className="relative h-[50vh] bg-secondary/30 flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src={aboutImage.imageUrl}
            alt="Craft workshop"
            data-ai-hint="craft workshop"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="relative container mx-auto px-4 text-center text-white">
          <h1 className="font-headline text-4xl md:text-6xl font-bold">Our Story</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg">From a shared passion to homes across the nation.</p>
        </div>
      </section>

      <section>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-headline text-3xl font-bold text-center">The Beginning</h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Furnishr was born from a simple idea shared between two friends in a small woodworking shop: that beautiful, high-quality furniture shouldn’t be a luxury reserved for a few. It should be accessible to everyone who dreams of creating a home they love.
            </p>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              We started with a single sofa design, meticulously crafted by hand. We poured over every detail, from the angle of the backrest to the stitching on the cushions. Our first customers were friends and family, but word quickly spread about the comfort and durability of our pieces.
            </p>
            <h2 className="font-headline text-3xl font-bold text-center mt-12">Growth and Commitment</h2>
             <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              As we grew, our commitment to quality never wavered. We expanded our workshop, hired skilled artisans who shared our passion, and began sourcing the finest materials we could find. We travelled to learn about timeless design principles and sustainable manufacturing practices, integrating them into our process.
            </p>
             <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Today, Furnishr is a proud UK-based company serving thousands of homes. While we've grown, our core philosophy remains the same: create furniture that is built to last, designed to inspire, and offered with a level of care that makes our customers feel like part of our family.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
