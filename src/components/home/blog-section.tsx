
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function BlogSection() {
    const latestPosts = blogPosts.slice(0, 3);
    return (
        <section className="bg-secondary/30">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="font-headline text-3xl md:text-4xl font-bold">From Our Blog</h2>
                    <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
                        Get inspired with our latest articles on interior design, trends, and furniture care.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {latestPosts.map((post) => (
                        <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                            <Card className="h-full flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-xl">
                                <div className="relative w-full aspect-[16/10]">
                                    <Image
                                        src={post.imageUrl}
                                        alt={post.title}
                                        data-ai-hint={post.imageHint}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                                <CardContent className="p-6 flex flex-col flex-grow">
                                    <p className="text-sm text-muted-foreground mb-2">{post.date}</p>
                                    <h3 className="font-headline text-xl mb-3 leading-snug flex-grow line-clamp-2">{post.title}</h3>
                                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{post.excerpt}</p>
                                    <div className="flex items-center text-primary font-semibold text-sm mt-auto">
                                        Read More <ArrowRight className="ml-2 h-4 w-4" />
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
                 <div className="text-center mt-12">
                    <Button asChild variant="outline">
                        <Link href="/blog">Visit The Blog</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
