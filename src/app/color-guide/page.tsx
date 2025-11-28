
import { Card, CardContent } from '@/components/ui/card';
import { Palette } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Color Guide | Furnishr',
  description: 'Explore our curated color palette and find the perfect shade for your home.',
};

const colors = [
    { name: 'Silver', hex: '#C0C0C0', description: 'A sleek and modern neutral that adds a touch of glamour.' },
    { name: 'Grey', hex: '#808080', description: 'A versatile and timeless neutral that pairs well with any color.' },
    { name: 'Beige', hex: '#F5F5DC', description: 'A warm and inviting neutral that creates a calming atmosphere.' },
    { name: 'Green', hex: '#228B22', description: 'A rich and earthy tone that brings a sense of nature indoors.' },
    { name: 'Blue', hex: '#0000FF', description: 'A classic and calming color that adds a touch of sophistication.' },
    { name: 'Black', hex: '#000000', description: 'A bold and dramatic choice for a modern, high-contrast look.' },
    { name: 'Cream', hex: '#FFFDD0', description: 'A soft and elegant off-white that adds warmth and light.' },
    { name: 'Brown', hex: '#A52A2A', description: 'A classic and grounding color that evokes a sense of comfort and stability.' },
];

export default function ColorGuidePage() {
  return (
    <div className="bg-secondary/30">
      <section className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
            <Palette className="h-12 w-12 mx-auto text-primary" />
          <h1 className="font-headline text-4xl md:text-5xl font-bold mt-4">Our Color Palette</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Discover the stories behind our curated colors and find the perfect hue to express your style.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {colors.map((color) => (
            <Card key={color.name} className="text-center">
              <div style={{ backgroundColor: color.hex }} className="h-40 w-full rounded-t-lg border-b" />
              <CardContent className="p-6">
                <h2 className="font-headline text-2xl font-semibold">{color.name}</h2>
                <p className="mt-2 text-muted-foreground text-sm">{color.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
