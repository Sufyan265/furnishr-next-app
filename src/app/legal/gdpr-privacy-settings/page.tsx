
import type { Metadata } from 'next';
import { ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export const metadata: Metadata = {
  title: 'Privacy Settings | Furnishr',
  description: 'Manage your privacy and data settings.',
};

export default function PrivacySettingsPage() {
  // In a real application, these states would be managed via a context or state management library
  // and would actually control cookie consent and data processing.
  return (
    <div className="bg-background">
      <section className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <ShieldCheck className="h-12 w-12 mx-auto text-primary" />
            <h1 className="font-headline text-4xl md:text-5xl font-bold mt-4">Your Privacy Settings</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Control how your information is used on our website.
            </p>
          </div>
          
          <div className="space-y-8">
            <div className="p-6 border rounded-lg">
                <h2 className="font-headline text-2xl font-semibold text-foreground">Cookie Consent</h2>
                <p className="text-muted-foreground mt-2 mb-6">We use cookies to enhance your browsing experience. You can choose which types of cookies to allow.</p>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="essential-cookies" className="font-semibold">Essential Cookies</Label>
                        <Switch id="essential-cookies" defaultChecked disabled />
                    </div>
                     <p className="text-sm text-muted-foreground">These cookies are necessary for the website to function and cannot be disabled. They include things like your shopping cart and session information.</p>
                     <div className="flex items-center justify-between">
                        <Label htmlFor="performance-cookies" className="font-semibold">Performance & Analytics Cookies</Label>
                        <Switch id="performance-cookies" defaultChecked />
                    </div>
                     <p className="text-sm text-muted-foreground">These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website and your experience.</p>
                </div>
            </div>

            <div className="p-6 border rounded-lg">
                <h2 className="font-headline text-2xl font-semibold text-foreground">Data Rights (GDPR)</h2>
                <p className="text-muted-foreground mt-2 mb-6">You have the right to access, rectify, or erase your personal data. Please contact us to make a request.</p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Button variant="outline">Request My Data</Button>
                    <Button variant="destructive">Request Data Deletion</Button>
                </div>
                 <p className="text-xs text-muted-foreground mt-4">Please note: Data requests will be processed within 30 days. We will contact you at your registered email address to verify your identity before proceeding.</p>
            </div>
             <div className="text-center mt-8">
                <Button>Save Preferences</Button>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
