import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Calendar, User } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Inspiration Blog | Furnishr',
  description: 'Interior design tips, furniture care advice, and styling guides from the experts at Furnishr.',
};

export default function BlogPage() {
  const [featuredPost, ...otherPosts] = blogPosts;
  
  return (
    <div className="bg-background">
      <section className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">Furnishr Insights</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Your source for interior design tips, styling inspiration, and the latest trends in home decor.
          </p>
        </div>

        {/* Featured Post */}
        <div className="mt-16 mb-24">
          <Link href={`/blog/${featuredPost.slug}`} className="group block">
            <Card className="grid md:grid-cols-2 overflow-hidden transition-shadow duration-300 hover:shadow-xl">
              <div className="relative aspect-video md:aspect-auto">
                <Image
                  src={featuredPost.imageUrl}
                  alt={featuredPost.title}
                  data-ai-hint={featuredPost.imageHint}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  priority
                />
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <p className="text-sm text-primary font-semibold mb-2">Featured Article</p>
                <h2 className="font-headline text-3xl lg:text-4xl mb-4 leading-snug">{featuredPost.title}</h2>
                <p className="text-muted-foreground text-base mb-6 line-clamp-3 flex-grow">{featuredPost.excerpt}</p>
                <div className="flex items-center text-sm text-muted-foreground mb-6">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>{featuredPost.date}</span>
                  </div>
                  <span className="mx-2">|</span>
                  <div className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>{featuredPost.author}</span>
                  </div>
                </div>
                <div className="flex items-center text-primary font-semibold text-sm mt-auto">
                  Read Article <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </Card>
          </Link>
        </div>

        {/* Other Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherPosts.map((post) => (
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
                  <h3 className="font-headline text-xl mb-3 leading-snug flex-grow">{post.title}</h3>
                  <div className="flex items-center text-primary font-semibold text-sm mt-auto">
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
