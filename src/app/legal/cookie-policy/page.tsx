
import type { Metadata } from 'next';
import { Cookie } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cookie Policy | Furnishr',
  description: 'Learn how we use cookies to improve your experience on our website.',
};

export default function CookiePolicyPage() {
  return (
    <div className="bg-background">
      <section className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <Cookie className="h-12 w-12 mx-auto text-primary" />
            <h1 className="font-headline text-4xl md:text-5xl font-bold mt-4">Cookie Policy</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Last updated: {new Date().toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>This Cookie Policy explains what cookies are and how we use them. You should read this policy to understand what cookies are, how we use them, the types of cookies we use, the information we collect using cookies and how that information is used, and how to control your cookie preferences.</p>

            <h2 className="font-headline text-2xl font-semibold text-foreground pt-4">What Are Cookies?</h2>
            <p>Cookies are small text files that are used to store small pieces of information. They are stored on your device when the website is loaded on your browser. These cookies help us make the website function properly, make the website more secure, provide a better user experience, and understand how the website performs.</p>

            <h2 className="font-headline text-2xl font-semibold text-foreground pt-4">How Do We Use Cookies?</h2>
            <p>As with most online services, our website uses first-party and third-party cookies for a number of purposes. The first-party cookies are mostly necessary for the website to function the right way, and they do not collect any of your personally identifiable data.</p>
            <p>The third-party cookies used on our websites are used mainly for understanding how the website performs, how you interact with our website, keeping our services secure, and all in all providing you with a better and improved user experience.</p>
            
            <h2 className="font-headline text-2xl font-semibold text-foreground pt-4">Types of Cookies We Use</h2>
            <ul className="list-disc list-inside space-y-2">
                <li><strong>Essential Cookies:</strong> These are necessary for the website to function and cannot be switched off. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in, or filling in forms.</li>
                <li><strong>Performance Cookies:</strong> These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site.</li>
                <li><strong>Functional Cookies:</strong> These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.</li>
            </ul>

            <h2 className="font-headline text-2xl font-semibold text-foreground pt-4">How Can I Control My Cookie Preferences?</h2>
            <p>You can manage your cookie preferences by clicking on the "Privacy Settings" link in our website footer and adjusting the settings. Should you decide to change your preferences later through your browsing session, you can do so by clearing the cookies in your browser.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
