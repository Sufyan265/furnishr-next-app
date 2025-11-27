import type {Metadata} from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/context/cart-context';
import { WishlistProvider } from '@/context/wishlist-context';
import DeliveryBanner from '@/components/delivery-banner';
import { FirebaseClientProvider } from '@/firebase';
import SocialProofPopup from '@/components/social-proof-popup';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: 'Furnishr - Modern Furniture for Your Home',
  description: 'Beautiful, high-quality furniture for every room. Free UK delivery, quality craftsmanship, and hassle-free returns.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("font-body antialiased bg-background min-h-screen flex flex-col")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <FirebaseClientProvider>
            <WishlistProvider>
              <CartProvider>
                <DeliveryBanner />
                <Header />
                <main className="flex-grow">
                  {children}
                </main>
                <Footer />
              </CartProvider>
            </WishlistProvider>
          </FirebaseClientProvider>
          <Toaster />
          <SocialProofPopup />
        </ThemeProvider>
      </body>
    </html>
  );
}
