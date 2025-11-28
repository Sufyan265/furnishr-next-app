
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Droplets, Sun, Wind, CircleHelp } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fabric Care Guide | Furnishr',
  description: 'Learn how to care for your furniture fabrics to keep them looking beautiful for years to come.',
};

export default function FabricCarePage() {
  const careTips = [
    {
      title: 'Regular Maintenance',
      description: 'Vacuum your upholstery weekly using a soft brush attachment to remove dust and debris. Plump and rotate cushions regularly to ensure even wear.',
      icon: Wind,
    },
    {
      title: 'Spills & Stains',
      description: 'Act quickly! Blot spills immediately with a clean, dry, absorbent white cloth. Do not rub. Work from the outside of the spill inward to prevent spreading.',
      icon: Droplets,
    },
    {
      title: 'Sunlight Exposure',
      description: 'Avoid placing your furniture in direct sunlight for extended periods, as this can cause fabrics to fade over time. Use curtains or blinds to protect your investment.',
      icon: Sun,
    },
    {
      title: 'Professional Cleaning',
      description: 'For deep cleaning or stubborn stains, we recommend consulting a professional upholstery cleaning service. Always check the fabric care label on your specific product.',
      icon: CircleHelp,
    },
  ];

  return (
    <div className="bg-secondary/30">
        <section className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
                <h1 className="font-headline text-4xl md:text-5xl font-bold">Keeping it Beautiful</h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Follow these simple steps to care for your furniture fabrics and ensure they stay looking their best for years to come.
                </p>
            </div>
            <div className="mt-16 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {careTips.map((tip) => (
                    <Card key={tip.title}>
                        <CardHeader className="flex flex-row items-center gap-4">
                            <tip.icon className="h-8 w-8 text-primary" />
                            <CardTitle className="font-headline text-2xl">{tip.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{tip.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
             <div className="text-center mt-12 max-w-2xl mx-auto">
                <h3 className="font-headline text-xl font-semibold">Cleaning Codes</h3>
                <p className="text-muted-foreground mt-2">Always check your item's specific cleaning code: [W] = Water-based cleaner; [S] = Solvent-based cleaner; [W/S] = Water- or Solvent-based cleaner; [X] = Vacuum only.</p>
            </div>
        </section>
    </div>
  );
}
