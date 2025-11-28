
import type { Metadata } from 'next';
import { Shield } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Furnishr',
  description: 'Read our privacy policy to understand how we collect, use, and protect your data.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-background">
      <section className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <Shield className="h-12 w-12 mx-auto text-primary" />
            <h1 className="font-headline text-4xl md:text-5xl font-bold mt-4">Privacy Policy</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Last updated: {new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>Furnishr ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.</p>

            <h2 className="font-headline text-2xl font-semibold text-foreground pt-4">1. Information We Collect</h2>
            <p>We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number, that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site, such as online chat and message boards.</li>
              <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.</li>
            </ul>

            <h2 className="font-headline text-2xl font-semibold text-foreground pt-4">2. Use of Your Information</h2>
            <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Create and manage your account.</li>
              <li>Email you regarding your account or order.</li>
              <li>Fulfill and manage purchases, orders, payments, and other transactions related to the Site.</li>
              <li>Improve our website and offerings.</li>
              <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
            </ul>

            <h2 className="font-headline text-2xl font-semibold text-foreground pt-4">3. Security of Your Information</h2>
            <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.</p>

             <h2 className="font-headline text-2xl font-semibold text-foreground pt-4">4. Policy for Children</h2>
            <p>We do not knowingly solicit information from or market to children under the age of 13. If you become aware of any data we have collected from children under age 13, please contact us using the contact information provided below.</p>

            <h2 className="font-headline text-2xl font-semibold text-foreground pt-4">5. Contact Us</h2>
            <p>If you have questions or comments about this Privacy Policy, please contact us at:</p>
            <address className="not-italic">
              Furnishr<br />
              123 Design Street<br />
              London, EC1V 9DD<br />
              United Kingdom<br />
              <Link href="/contact" className="text-primary hover:underline">hello@furnishr.co.uk</Link>
            </address>
          </div>
        </div>
      </section>
    </div>
  );
}
