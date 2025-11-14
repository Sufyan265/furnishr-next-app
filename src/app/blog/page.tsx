import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '@/lib/data';
import { Card } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Inspiration Blog | Furnishr',
  description: 'Interior design tips, furniture care advice, and styling guides from the experts at Furnishr.',
};

export default function BlogPage() {
  return (
    <div className="bg-background">
      <section className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">Furnishr Insights</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Your source for interior design tips, styling inspiration, and the latest trends in home decor.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post, index) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className={`group block ${index === 0 ? 'md:col-span-2' : ''}`}>
              <Card className={`h-full flex ${index === 0 ? 'md:flex-row flex-col' : 'flex-col'} overflow-hidden transition-shadow duration-300 hover:shadow-xl`}>
                <div className={`relative w-full ${index === 0 ? 'md:w-1/2' : ''} ${index > 0 ? 'aspect-[16/10]' : 'aspect-video md:aspect-auto'}`}>
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    data-ai-hint={post.imageHint}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className={`p-6 lg:p-8 flex flex-col flex-grow ${index === 0 ? 'md:w-1/2 justify-center' : ''}`}>
                  <p className="text-sm text-muted-foreground mb-2">{post.date}</p>
                  <h3 className="font-headline text-2xl lg:text-3xl mb-3 leading-snug">{post.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-grow">{post.excerpt}</p>
                  <div className="flex items-center text-primary font-semibold text-sm mt-auto">
                    Read Article <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
