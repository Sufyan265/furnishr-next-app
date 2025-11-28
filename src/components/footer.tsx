
import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Facebook, Instagram, Twitter } from "lucide-react";

const VisaIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="38" height="24" viewBox="0 0 38 24" {...props}><path d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" fill="#3A5594"/><path d="M28.4 10.1s.1-.1.2-.1h.2c.1 0 .2.1.2.1l2.4 4.9c.1.2.2.3.4.3h2.1c.2 0 .3-.1.4-.2.1-.2.1-.3-.1-.5l-3.8-7.9c-.2-.4-.5-.6-.9-.6h-3.4c-.4 0-.7.2-.9.6L22 14.8c-.1.2-.1.4.1.5.1.1.2.2.4.2h2.1c.2 0 .3-.1.4-.3l2.4-4.6zM13.2 2.6h-3.1c-.4 0-.7.3-.7.7l-2.4 8.4c-.1.4.2.8.6.8h3.1c.4 0 .7-.3.7-.7L13.9 4c.1-.4-.2-.8-.7-.8zm5.7 7.5l-2.5-7.5c-.2-.4-.5-.6-.9-.6h-3.4c-1.2 0-2.3 1-2.3 2.2 0 .8.4 1.5 1 1.9l4.3 2.1c.5.2.8.7.8 1.2 0 .9-.9 1.4-1.9 1.4h-4.3c-.5 0-.9.2-1.2.5l-.8.9c-.2.2-.2.5 0 .7l1.3 1c.2.2.5.2.7 0l.8-.9c.3-.3.7-.5 1.2-.5h4.3c1.2 0 2.3-1 2.3-2.2.1-.8-.4-1.5-1-1.9l-4.3-2.1c-.5-.2-.8-.7-.8-1.2 0-.3.3-.6.7-.6h3.4c.4 0 .7.2.9.6l2.5 7.5c.1.2.3.3.5.3h2.2c.2 0 .4-.1.4-.3v-.1c-.1-.2-.2-.3-.3-.4zM38 3v18c0 1.7-1.3 3-3 3H3c-1.7 0-3-1.3-3-3V3c0-1.7 1.3-3 3-3h32c1.7 0 3 1.3 3 3z" fill="#fff"/></svg>
);

const MastercardIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="38" height="24" viewBox="0 0 38 24" {...props}><path d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" fill="#242424"/><circle cx="15" cy="12" r="7" fill="#EB001B"/><circle cx="23" cy="12" r="7" fill="#F79E1B"/><path d="M20 12c0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8 8 3.6 8 8z" fill="#FF5F00"/></svg>
);

const AmexIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="38" height="24" viewBox="0 0 38 24" {...props}><path d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" fill="#006FCF"/><path fill="#FFF" d="M11.3 12.9h5.1v1.6h-5.1zm3.8-3.4h-5.2v1.6h5.2v-1.6zm-3.8 6.8h5.1v1.6h-5.1v-1.6zm10.7-6.8h5.1v1.6h-5.1zm-2.8 1.7h5.1v1.6h-5.1zm-2.3 1.7h5.1v1.6h-5.1zm2.3 1.7h5.1v1.6h-5.1zm2.8 1.7h5.1v1.6h-5.1z"/><path fill="#006FCF" d="M21.9 12.3h-2.1v-1h2.1v1zM21.9 14.4h-2.1v-1h2.1v1zM19.8 10.2h2.1v-1h-2.1v1zM19.8 16.5h2.1v-1h-2.1v1zM19.8 12.3h-2.1v-1h2.1v1zM19.8 14.4h-2.1v-1h2.1v1zM17.7 10.2h2.1v-1h-2.1v1zM17.7 16.5h2.1v-1h-2.1v1z"/><path fill="#FFF" d="M18.8 13.4a1 1 0 0 1-1-1 1 1 0 0 1 1-1 1 1 0 0 1 1 1 1 1 0 0 1-1 1zm-2.1 2.1a1 1 0 0 1-1-1 1 1 0 0 1 1-1 1 1 0 0 1 1 1 1 1 0 0 1-1 1zm-2.1-2.1a1 1 0 0 1-1-1 1 1 0 0 1 1-1 1 1 0 0 1 1 1 1 1 0 0 1-1 1zm2.1-2.1a1 1 0 0 1-1-1 1 1 0 0 1 1-1 1 1 0 0 1 1 1 1 1 0 0 1-1 1zm2.1 2.1a1 1 0 0 1-1-1 1 1 0 0 1 1-1 1 1 0 0 1 1 1 1 1 0 0 1-1 1zm2.1-2.1a1 1 0 0 1-1-1 1 1 0 0 1 1-1 1 1 0 0 1 1 1 1 1 0 0 1-1 1zm-2.1 2.1a1 1 0 0 1-1-1 1 1 0 0 1 1-1 1 1 0 0 1 1 1 1 1 0 0 1-1 1zm2.1-2.1a1 1 0 0 1-1-1 1 1 0 0 1 1-1 1 1 0 0 1 1 1 1 1 0 0 1-1 1zm2.1 2.1a1 1 0 0 1-1-1 1 1 0 0 1 1-1 1 1 0 0 1 1 1 1 1 0 0 1-1 1z"/></svg>
);

const PaypalIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="38" height="24" viewBox="0 0 38 24" {...props}><g fill="none" fillRule="evenodd"><path fill="#003087" d="M34.6,0H5.1C3.5,0,2.3,1.2,2.3,2.7v18.5c0,1.5,1.2,2.7,2.7,2.7h29.5c1.5,0,2.7-1.2,2.7-2.7V2.7C37.3,1.2,36.1,0,34.6,0Z"/><path fill="#FFF" d="M21.2,4.4h6.3c1,0,1.8,0.3,2.2,0.8s0.6,1.2,0.5,2.1c-0.1,1.1-0.6,2-1.5,2.7c-0.9,0.7-2.1,1-3.6,1h-1.6c-0.4,0-0.7,0.1-0.9,0.3s-0.3,0.5-0.2,0.8l0.8,5c0.1,0.3,0,0.6-0.1,0.8s-0.3,0.3-0.5,0.3h-2.9c-0.3,0-0.6-0.2-0.7-0.5l-2.4-12C19.3,4.8,19.7,4.4,20.2,4.4h1.1V4.4Zm5.2,4.2c0.8,0,1.5-0.3,1.8-0.8c0.4-0.5,0.5-1.1,0.6-1.7c0-0.1,0-0.2,0-0.2c0-0.3-0.1-0.5-0.4-0.5h-1.9c-1,0-1.8,0.2-2.4,0.6c-0.5,0.4-0.9,1-1.1,1.8l-0.3,1.8c0.6-0.3,1.3-0.5,2-0.5H26.4Z"/><path fill="#009CDE" d="M15.4,4.4h6c0.5,0,0.9,0.4,1,0.9L24.8,17c0.1,0.3-0.1,0.7-0.4,0.7h-3.1c-0.3,0-0.6-0.2-0.7-0.5l-0.5-3.3c-0.1-0.3-0.3-0.5-0.6-0.5H18c-0.5,0-0.9-0.4-1-0.9l-2-12C15,4.5,15.2,4.4,15.4,4.4Z"/><path fill="#00296b" d="M9.1,4.4h6.3c1,0,1.8,0.3,2.2,0.8c0.4,0.5,0.6,1.2,0.5,2.1c-0.1,1.1-0.6,2-1.5,2.7c-0.9,0.7-2.1,1-3.6,1h-1.6c-0.4,0-0.7,0.1-0.9,0.3S10,11.8,10.1,12l0.8,5c0.1,0.3,0,0.6-0.1,0.8c-0.1,0.2-0.3,0.3-0.5,0.3H7.4c-0.3,0-0.6-0.2-0.7-0.5L4.4,5.3C4.3,4.8,4.7,4.4,5.2,4.4H9.1Z"/></g></svg>
);

const ApplePayIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="38" height="24" viewBox="0 0 38 24" {...props}><path d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" fill="#242424"/><path d="M19.1 11.4c.3-.3.5-.6.5-1 0-.4-.2-.8-.5-1-.6-.6-1.6-.6-2.2 0-.6.6-.6 1.6 0 2.2.3.3.6.5 1 .5s.8-.2 1.1-.5l.1-.2zm3.3-3.6c-.6-1.5-1.7-2.5-3-2.8-.1 1.1.2 2.2.8 3.1.5.8 1.2 1.5 2.1 1.8.1-1-.2-2-.9-2.1zm-3.2 8.4c.5.1 1 .2 1.5.2 1.1 0 2.2-.4 3-1.2.8-.7 1.3-1.8 1.4-2.9h-2.4c-.9.9-2 1.5-3.3 1.5-.4 0-.8 0-1.2-.1v2.5zM17.4 3.2c-2.3 0-4.3 1.5-5.2 3.6.4.1.8.2 1.2.2 1.1 0 2.1-.5 2.8-1.3.8-.9 1.2-2.1 1.2-3.4v-.1z" fill="#FFF"/></svg>
);

export default function Footer() {
  return (
    <footer className="bg-secondary/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="md:col-span-2 lg:col-span-2">
            <h3 className="font-headline text-lg font-semibold">Stay in the Loop</h3>
            <p className="mt-2 text-muted-foreground">Sign up for our newsletter to get the latest on new arrivals, special offers, and design inspiration.</p>
            <form className="mt-4 flex w-full max-w-sm items-center space-x-2">
              <Input type="email" placeholder="Enter your email" className="bg-background" />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold">Company</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary">About Us</Link></li>
              <li><Link href="/blog" className="text-muted-foreground hover:text-primary">Blog</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold">Help</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/faq" className="text-muted-foreground hover:text-primary">FAQs</Link></li>
              <li><Link href="/legal/returns-policy" className="text-muted-foreground hover:text-primary">Returns Policy</Link></li>
            </ul>
          </div>
           <div>
            <h3 className="font-headline text-lg font-semibold">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/legal/privacy-policy" className="text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="/legal/terms-and-conditions" className="text-muted-foreground hover:text-primary">Terms & Conditions</Link></li>
              <li><Link href="/legal/cookie-policy" className="text-muted-foreground hover:text-primary">Cookie Policy</Link></li>
              <li><Link href="/legal/gdpr-privacy-settings" className="text-muted-foreground hover:text-primary">Privacy Settings</Link></li>
              <li><Link href="/legal/accessibility-statement" className="text-muted-foreground hover:text-primary">Accessibility</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-muted-foreground text-sm text-center md:text-left">
            <p>&copy; {new Date().getFullYear()} Furnishr. All rights reserved.</p>
            <p>Designed With Love By Arslan Maverick</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap justify-center">
              <VisaIcon />
              <MastercardIcon />
              <AmexIcon />
              <PaypalIcon />
              <ApplePayIcon />
          </div>
          <div className="flex items-center space-x-4">
            <Link href="#" className="text-muted-foreground hover:text-primary"><Instagram className="h-5 w-5" /></Link>
            <Link href="#" className="text-muted-foreground hover:text-primary"><Facebook className="h-5 w-5" /></Link>
            <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter className="h-5 w-5" /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
