import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogBySlug } from '@/lib/data';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';

type BlogDetailProps = {
  params: { slug: string };
};

export async function generateMetadata({ params }: BlogDetailProps): Promise<Metadata> {
  const post = getBlogBySlug(params.slug);
  if (!post) {
    return { title: 'Post Not Found | Furnishr' };
  }
  return {
    title: `${post.title} | Furnishr`,
    description: post.excerpt,
  };
}

export default function BlogDetailPage({ params }: BlogDetailProps) {
  const post = getBlogBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Button asChild variant="ghost">
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
          </div>
          <header className="mb-12">
            <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">{post.title}</h1>
            <div className="mt-6 flex items-center space-x-6 text-muted-foreground text-sm">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
            </div>
          </header>
          
          <div className="relative aspect-video w-full rounded-lg overflow-hidden mb-12 shadow-lg">
            <Image
              src={post.imageUrl}
              alt={post.title}
              data-ai-hint={post.imageHint}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div
            className="blog-content max-w-none mx-auto"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>
    </article>
  );
}
