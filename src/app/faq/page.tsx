
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { faqs } from '@/lib/data';
import type { Metadata } from 'next';
import { Truck, RotateCw, ShoppingBag, Box, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Furnishr',
  description: 'Find answers to common questions about ordering, shipping, returns, and our products.',
};

const iconMap: { [key: string]: React.ReactNode } = {
  'Ordering': <ShoppingBag className="h-6 w-6 mr-4" />,
  'Shipping & Delivery': <Truck className="h-6 w-6 mr-4" />,
  'Returns & Exchanges': <RotateCw className="h-6 w-6 mr-4" />,
  'Product Information': <Box className="h-6 w-6 mr-4" />,
  'Care & Cleaning': <Sparkles className="h-6 w-6 mr-4" />,
};

export default function FaqPage() {
  const groupedFaqs = faqs.reduce((acc, faq) => {
    (acc[faq.category] = acc[faq.category] || []).push(faq);
    return acc;
  }, {} as Record<string, typeof faqs>);

  return (
    <div className="bg-background">
      <section className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">Frequently Asked Questions</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Have a question? We're here to help. Find answers to common queries below.
          </p>
        </div>

        <div className="max-w-3xl mx-auto mt-16 space-y-12">
          {Object.entries(groupedFaqs).map(([category, questions]) => (
            <div key={category}>
              <div className="flex items-center text-primary mb-4">
                {iconMap[category]}
                <h2 className="font-headline text-2xl md:text-3xl font-bold">{category}</h2>
              </div>
              <Accordion type="single" collapsible className="w-full">
                {questions.map((faq) => (
                  <AccordionItem key={faq.id} value={`item-${faq.id}`}>
                    <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
