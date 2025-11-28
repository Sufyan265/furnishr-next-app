
'use client';

import Image from 'next/image';
import { getImage } from '@/lib/placeholder-images';
import { Award, Feather, ShieldCheck } from 'lucide-react';

export default function Craftsmanship() {
    const image = getImage('about-us');

    return (
        <section className="bg-background">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                        <Image
                            src={image.imageUrl}
                            alt={image.description}
                            data-ai-hint={image.imageHint}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <h2 className="font-headline text-3xl md:text-4xl font-bold">Built to Last, Designed to Inspire</h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            We believe that furniture is more than just functional; it’s an expression of your style and a cornerstone of your home. That’s why we're dedicated to exceptional craftsmanship in every piece we create.
                        </p>
                        <div className="mt-8 space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="bg-primary/10 text-primary p-3 rounded-full">
                                    <Award className="h-6 w-6"/>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Premium Materials</h3>
                                    <p className="text-muted-foreground">From solid oak frames to top-grain leathers and luxurious velvets, we source only the finest materials for durability and beauty.</p>
                                </div>
                            </div>
                             <div className="flex items-start gap-4">
                                <div className="bg-primary/10 text-primary p-3 rounded-full">
                                    <Feather className="h-6 w-6"/>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Skilled Artisans</h3>
                                    <p className="text-muted-foreground">Our furniture is brought to life by skilled artisans who blend traditional techniques with modern precision.</p>
                                </div>
                            </div>
                             <div className="flex items-start gap-4">
                                <div className="bg-primary/10 text-primary p-3 rounded-full">
                                    <ShieldCheck className="h-6 w-6"/>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Quality Inspected</h3>
                                    <p className="text-muted-foreground">Every item undergoes a rigorous quality control process to ensure it meets our exacting standards before it reaches your home.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
