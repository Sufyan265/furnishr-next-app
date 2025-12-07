
import type { Metadata } from 'next';
import { Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Accessibility Statement | Furnishr',
  description: 'Our commitment to ensuring digital accessibility for people with disabilities.',
};

export default function AccessibilityStatementPage() {
  return (
    <div className="bg-background">
      <section className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <Users className="h-12 w-12 mx-auto text-primary" />
            <h1 className="font-headline text-4xl md:text-5xl font-bold mt-4">Accessibility Statement</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              We are committed to making our website accessible to everyone.
            </p>
          </div>
          
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>Furnishr is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.</p>

            <h2 className="font-headline text-2xl font-semibold text-foreground pt-4">Measures to Support Accessibility</h2>
            <p>Furnishr takes the following measures to ensure accessibility of our website:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Include accessibility as part of our mission statement.</li>
              <li>Integrate accessibility into our procurement practices.</li>
              <li>Provide continual accessibility training for our staff.</li>
              <li>Assign clear accessibility targets and responsibilities.</li>
            </ul>

            <h2 className="font-headline text-2xl font-semibold text-foreground pt-4">Conformance Status</h2>
            <p>The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA. Our website is partially conformant with WCAG 2.1 level AA. Partially conformant means that some parts of the content do not fully conform to the accessibility standard.</p>

            <h2 className="font-headline text-2xl font-semibold text-foreground pt-4">Feedback</h2>
            <p>We welcome your feedback on the accessibility of our website. Please let us know if you encounter accessibility barriers:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Phone: +44 (0)20 1234 5678</li>
              <li>E-mail: hello@furnishr.co.uk</li>
              <li>Visitor Address: 123 Design Street, London, EC1V 9DD, United Kingdom</li>
            </ul>
            <p>We try to respond to feedback within 5 business days.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
