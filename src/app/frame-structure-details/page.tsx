
import Image from 'next/image';
import { getImage } from '@/lib/placeholder-images';
import { ShieldCheck, Zap } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frame Structure Details | Furnishr',
  description: 'Learn about the robust construction and superior materials that make our furniture frames built to last.',
};

export default function FrameStructurePage() {
  const image = getImage('product-dino-sofa-5');

  return (
    <div>
        <section className="relative h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src={image.imageUrl}
            alt="Wooden frame of a sofa"
            data-ai-hint="sofa frame"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative container mx-auto px-4 text-center text-white">
          <h1 className="font-headline text-4xl md:text-6xl font-bold">Built from the Inside Out</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg">The unseen structure that guarantees a lifetime of comfort.</p>
        </div>
      </section>
      
      <section className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-headline text-3xl font-bold text-center">The Backbone of Quality</h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            The frame is the most critical component of any piece of upholstered furniture. It's the skeleton that provides shape, structure, and strength. At Furnishr, we never compromise on this essential foundation, ensuring every sofa and bed we make is built to withstand the rigors of daily life for years to come.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 mt-16">
            <div className="flex items-start gap-4">
                <ShieldCheck className="h-10 w-10 text-primary flex-shrink-0 mt-1" />
                <div>
                    <h3 className="font-headline text-2xl font-semibold">Kiln-Dried Hardwood</h3>
                    <p className="mt-2 text-muted-foreground">We use solid hardwood that has been kiln-dried to prevent warping and cracking over time. This process removes moisture from the wood, ensuring it remains stable and strong throughout its life.</p>
                </div>
            </div>
            <div className="flex items-start gap-4">
                <Zap className="h-10 w-10 text-primary flex-shrink-0 mt-1" />
                <div>
                    <h3 className="font-headline text-2xl font-semibold">Reinforced Joinery</h3>
                    <p className="mt-2 text-muted-foreground">Our frames are constructed using traditional joinery methods. All critical joints are glued, double-doweled, and screwed for maximum strength. Corner blocks are added for extra reinforcement, preventing any twists or creaks.</p>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}
