
import type { Metadata } from 'next';
import { FileText } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Furnishr',
  description: 'Read our terms and conditions before using our website and services.',
};

export default function TermsAndConditionsPage() {
  return (
    <div className="bg-background">
      <section className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <FileText className="h-12 w-12 mx-auto text-primary" />
            <h1 className="font-headline text-4xl md:text-5xl font-bold mt-4">Terms & Conditions</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Last updated: {new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>Welcome to Furnishr. These terms and conditions outline the rules and regulations for the use of Furnishr's Website, located at furnishr.co.uk.</p>
            <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use Furnishr if you do not agree to take all of the terms and conditions stated on this page.</p>

            <h2 className="font-headline text-2xl font-semibold text-foreground pt-4">1. Intellectual Property</h2>
            <p>The content, layout, design, data, databases and graphics on this website are protected by UK and other international intellectual property laws and are owned by Furnishr. Unless expressly permitted in writing in a license agreement from us, you are not permitted to copy, modify, reproduce, republish, or otherwise use any content on this website.</p>

            <h2 className="font-headline text-2xl font-semibold text-foreground pt-4">2. Use of the Website</h2>
            <p>You are permitted to use our website for your own purposes and to print and download material from this Website provided that you do not modify any content without our consent. You must not use our website for any unlawful purpose.</p>

            <h2 className="font-headline text-2xl font-semibold text-foreground pt-4">3. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, Furnishr excludes all liability for any loss or damage of any kind howsoever arising, including without limitation any direct, indirect or consequential loss whether or not such arises out of any problem you notify to Furnishr and Furnishr shall have no liability to pay any money by way of compensation.</p>

            <h2 className="font-headline text-2xl font-semibold text-foreground pt-4">4. Governing Law</h2>
            <p>These terms and conditions are governed by and construed in accordance with the laws of the United Kingdom and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.</p>
            
            <h2 className="font-headline text-2xl font-semibold text-foreground pt-4">5. Contact Us</h2>
            <p>If you have any questions about these Terms, please <Link href="/contact" className="text-primary hover:underline">contact us</Link>.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
