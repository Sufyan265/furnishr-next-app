
import Image from 'next/image';
import { getImage } from '@/lib/placeholder-images';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Our Sofa Beds Are Made | Furnishr',
  description: 'A behind-the-scenes look at the craftsmanship and engineering that go into our versatile and comfortable sofa beds.',
};

const steps = [
  {
    title: '1. The Solid Wood Frame',
    description: "Every great sofa bed starts with a strong foundation. We construct our frames from kiln-dried solid hardwood. Each joint is glued, dowelled, and screwed to ensure maximum strength and durability, providing a sturdy base for both sitting and sleeping.",
    imageId: "product-bed-ambassador-7"
  },
  {
    title: '2. The Conversion Mechanism',
    description: "The magic of a sofa bed lies in its mechanism. We use high-quality, easy-to-operate steel mechanisms, from traditional pull-outs to modern 'click-clack' systems. They are rigorously tested to ensure smooth, reliable operation for years to come.",
    imageId: "product-artic-sofa-2"
  },
  {
    title: '3. Layering for Comfort',
    description: "Next, we build up the comfort layers. A combination of webbing, springs, and high-density foam is applied to the frame to provide supportive seating. The integrated mattress is chosen for its balance of comfort and foldability.",
    imageId: "product-bed-sleigh-5"
  },
  {
    title: '4. Expert Upholstery',
    description: "Our skilled upholsterers meticulously cut, sew, and fit the chosen fabric or leather. Every seam is perfected, and patterns are carefully aligned. This final step is where the sofa bed's character and beauty truly come to life.",
    imageId: "expert-upholstery"
  }
];

export default function HowSofaBedsAreMadePage() {
  return (
    <div>
      <section className="bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-headline text-4xl md:text-5xl font-bold">Behind the Seams</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Discover the blend of traditional craftsmanship and modern engineering that makes our sofa beds both stylish and functional.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-16">
            {steps.map((step, index) => (
              <div key={step.title} className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center ${index % 2 === 1 ? 'md:grid-flow-row-dense' : ''}`}>
                <div className={`relative aspect-video rounded-lg overflow-hidden ${index % 2 === 1 ? 'md:col-start-2' : ''}`}>
                  <Image
                    src={getImage(step.imageId).imageUrl}
                    alt={step.title}
                    data-ai-hint={getImage(step.imageId).imageHint}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="md:col-start-1">
                  <h2 className="font-headline text-3xl font-bold">{step.title}</h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
