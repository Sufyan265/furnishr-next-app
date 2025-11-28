
import Image from 'next/image';
import { categoryImages } from '@/lib/placeholder-images';
import { Award, Feather, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Why Choose Us | Furnishr',
  description: 'Learn why Furnishr is the best choice for quality, design, and service in home furniture.',
};

export default function WhyChooseUsPage() {
  const chooseUsImage = categoryImages['living-room'];

  return (
    <div>
       <section className="relative h-[50vh] bg-secondary/30 flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src={chooseUsImage.imageUrl}
            alt={chooseUsImage.description}
            data-ai-hint={chooseUsImage.imageHint}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="relative container mx-auto px-4 text-center text-white">
          <h1 className="font-headline text-4xl md:text-6xl font-bold">Why Choose Furnishr?</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg">We're more than a store. We're your partner in creating a home you love.</p>
        </div>
      </section>

      <section>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
                <Award className="h-10 w-10 text-primary flex-shrink-0 mt-1" />
                <div>
                    <h3 className="font-headline text-2xl font-semibold">Uncompromising Quality</h3>
                    <p className="mt-2 text-muted-foreground">We use only the finest materials, from solid hardwood frames to premium fabrics and leathers. Our furniture is built by skilled artisans to meet exacting standards, ensuring it stands the test of time.</p>
                </div>
            </div>
             <div className="flex items-start gap-4">
                <Sparkles className="h-10 w-10 text-primary flex-shrink-0 mt-1" />
                <div>
                    <h3 className="font-headline text-2xl font-semibold">Timeless Design</h3>
                    <p className="mt-2 text-muted-foreground">Our collections are thoughtfully designed to be both contemporary and enduring. We create pieces that transcend fleeting trends, bringing lasting style and elegance to your home.</p>
                </div>
            </div>
             <div className="flex items-start gap-4">
                <Feather className="h-10 w-10 text-primary flex-shrink-0 mt-1" />
                <div>
                    <h3 className="font-headline text-2xl font-semibold">Sustainable Practices</h3>
                    <p className="mt-2 text-muted-foreground">We believe in beautiful design that's also kind to our planet. We are committed to responsible sourcing, using eco-friendly materials, and minimizing our environmental footprint wherever possible.</p>
                </div>
            </div>
             <div className="flex items-start gap-4">
                <Truck className="h-10 w-10 text-primary flex-shrink-0 mt-1" />
                <div>
                    <h3 className="font-headline text-2xl font-semibold">Exceptional Service</h3>
                    <p className="mt-2 text-muted-foreground">Your experience matters to us. From free UK delivery on most orders to our hassle-free 30-day return policy, we're dedicated to providing a seamless and supportive customer journey.</p>
                </div>
            </div>
             <div className="flex items-start gap-4">
                <ShieldCheck className="h-10 w-10 text-primary flex-shrink-0 mt-1" />
                <div>
                    <h3 className="font-headline text-2xl font-semibold">Built in the UK</h3>
                    <p className="mt-2 text-muted-foreground">We are a proud British company. By designing and building our furniture locally, we support local craftsmanship and ensure the highest standards of quality control from start to finish.</p>
                </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
