
import Image from 'next/image';
import { getImage } from '@/lib/placeholder-images';
import { Leaf, Recycle, Globe } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sustainability Commitment | Furnishr',
  description: 'Learn about Furnishr\'s dedication to eco-friendly practices, responsible sourcing, and a greener future.',
};

export default function SustainabilityPage() {
  const sustainabilityImage = getImage('blog-3');

  return (
    <div>
      <section className="relative h-[50vh] bg-green-900/30 flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src={sustainabilityImage.imageUrl}
            alt="Lush green forest"
            data-ai-hint="green forest"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative container mx-auto px-4 text-center text-white">
          <h1 className="font-headline text-4xl md:text-6xl font-bold">Our Commitment to the Planet</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg">Crafting a greener future, one piece of furniture at a time.</p>
        </div>
      </section>

      <section>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-headline text-3xl font-bold text-center">Design with a Conscience</h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              At Furnishr, we believe that creating a beautiful home shouldn't come at the expense of the planet. We are deeply committed to sustainable and ethical practices throughout our entire business, from the first design sketch to the final delivery at your door.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto mt-16 grid md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <Leaf className="h-12 w-12 text-primary mb-4" />
              <h3 className="font-headline text-2xl font-semibold">Responsibly Sourced Materials</h3>
              <p className="mt-2 text-muted-foreground">We prioritize using wood from FSC-certified forests, recycled metals, and fabrics made from natural or recycled fibers. We ensure our materials are sourced in a way that respects ecosystems and communities.</p>
            </div>
            <div className="flex flex-col items-center">
              <Recycle className="h-12 w-12 text-primary mb-4" />
              <h3 className="font-headline text-2xl font-semibold">Minimizing Waste</h3>
              <p className="mt-2 text-muted-foreground">Our production process is designed to minimize waste. We optimize cutting patterns to use as much material as possible, and we recycle off-cuts and scraps. Our packaging is made from recycled materials and is fully recyclable.</p>
            </div>
            <div className="flex flex-col items-center">
              <Globe className="h-12 w-12 text-primary mb-4" />
              <h3 className="font-headline text-2xl font-semibold">Built to Last</h3>
              <p className="mt-2 text-muted-foreground">The most sustainable product is one you don't have to replace. We reject the "fast furniture" trend by creating high-quality, durable pieces designed to be cherished for a lifetime, not just a season.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
