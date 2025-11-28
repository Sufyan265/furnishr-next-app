
import type { Metadata } from 'next';
import { Truck } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Returns Policy | Furnishr',
  description: 'Information about our 30-day hassle-free return policy.',
};

export default function ReturnsPolicyPage() {
  return (
    <div className="bg-background">
      <section className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <Truck className="h-12 w-12 mx-auto text-primary" />
            <h1 className="font-headline text-4xl md:text-5xl font-bold mt-4">Returns Policy</h1>
            <p className="mt-4 text-lg text-muted-foreground">
             Our 30-day hassle-free returns.
            </p>
          </div>
          
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>We want you to be completely happy with your purchase. If for any reason you are not satisfied, we are happy to offer a refund or exchange on all new, unused items returned to us within 30 days of delivery.</p>

            <h2 className="font-headline text-2xl font-semibold text-foreground pt-4">Conditions for Return</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Items must be in their original, unused condition.</li>
              <li>Items must be returned in their original packaging.</li>
              <li>You must provide proof of purchase.</li>
              <li>Custom or made-to-order items are not eligible for return unless faulty.</li>
            </ul>

            <h2 className="font-headline text-2xl font-semibold text-foreground pt-4">How to Initiate a Return</h2>
            <p>To start a return, please contact our customer service team via our <Link href="/contact" className="text-primary hover:underline">contact page</Link>. Please include your order number and the reason for your return in your message. Our team will guide you through the process.</p>
            
            <h2 className="font-headline text-2xl font-semibold text-foreground pt-4">Refunds</h2>
            <p>Once we receive and inspect your returned item, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed, and a credit will automatically be applied to your original method of payment within 7-10 business days.</p>

            <h2 className="font-headline text-2xl font-semibold text-foreground pt-4">Damaged Items</h2>
            <p>If your item arrives damaged, please contact us within 48 hours of delivery with photos of the damage. We will arrange for a replacement or a full refund.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
