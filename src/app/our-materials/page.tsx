
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, ShieldCheck, Zap } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Materials | Furnishr',
  description: 'Explore the high-quality, sustainable materials we use to craft our furniture, from solid woods to premium fabrics.',
};

export default function OurMaterialsPage() {
  const materials = [
    {
      name: 'Solid Hardwoods',
      description: 'We use FSC-certified oak, walnut, and ash for their strength, durability, and beautiful grain. Our woods are the foundation of furniture built to last for generations.',
      icon: Leaf,
    },
    {
      name: 'Premium Fabrics',
      description: 'Our collection includes durable linens, plush velvets, and soft bouclés. Many of our fabrics incorporate recycled fibers and are treated for stain resistance without harmful chemicals.',
      icon: ShieldCheck,
    },
    {
      name: 'Genuine Leathers',
      description: 'We source top-grain leathers from tanneries that practice responsible and ethical production methods. Leather offers timeless beauty and develops a unique patina over time.',
      icon: Zap,
    },
    {
      name: 'High-Resilience Foam',
      description: 'Our cushions are made from high-density, CertiPUR-US® certified foam, which is made without ozone depleters, heavy metals, and with low VOC emissions for better indoor air quality.',
      icon: Leaf,
    },
    {
      name: 'Recycled Metals',
      description: 'Our metal frames and legs are crafted from high-grade steel and aluminum, often incorporating recycled content to reduce environmental impact without sacrificing strength.',
      icon: Recycle,
    }
  ];

  return (
    <div className="bg-secondary/30">
        <section className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
                <h1 className="font-headline text-4xl md:text-5xl font-bold">Quality in Every Fiber</h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    The finest furniture begins with the finest materials. We thoughtfully select every component for its beauty, durability, and environmental credentials.
                </p>
            </div>
            <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {materials.map((material) => (
                <Card key={material.name}>
                    <CardHeader>
                        <div className="flex items-center gap-4">
                            <material.icon className="h-8 w-8 text-primary" />
                            <CardTitle className="font-headline text-2xl">{material.name}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">{material.description}</p>
                    </CardContent>
                </Card>
                ))}
            </div>
        </section>
    </div>
  );
}
