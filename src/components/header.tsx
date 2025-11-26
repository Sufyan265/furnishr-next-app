
"use client";

import Link from "next/link";
import { ShoppingCart, Menu, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";
import { Separator } from "./ui/separator";
import SearchDialog from "./search-dialog";
import AuthButton from "./auth-button";

const navLinks = [
  { href: "/products", label: "All Products" },
  { href: "/products?category=sofas", label: "Sofas" },
  { href: "/products?category=beds", label: "Beds" },
  { href: "/products?category=mattresses", label: "Mattresses" },
  { href: "/clearance", label: "Clearance" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About Us" },
];

export default function Header() {
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const pathname = usePathname();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-headline text-2xl font-bold">Furnishr</span>
        </Link>
        
        <nav className="hidden md:flex flex-1 items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors hover:text-primary",
                  (pathname === link.href || (link.href.includes('?') && pathname.startsWith(link.href.split('?')[0]) && typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('category') === new URLSearchParams(link.href.split('?')[1]).get('category')))
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

        <div className="flex items-center space-x-1 sm:space-x-2 ml-auto">
            <SearchDialog />
            <AuthButton />
            <Button variant="ghost" size="icon" asChild>
              <Link href="/wishlist" aria-label="Wishlist">
                <div className="relative">
                  <Heart className="h-5 w-5" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      {wishlistCount}
                    </span>
                  )}
                </div>
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="/cart" aria-label="Shopping Cart">
                <div className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      {totalItems}
                    </span>
                  )}
                </div>
              </Link>
            </Button>

            <div className="md:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="pr-0 flex flex-col">
                  <SheetHeader className="text-left">
                     <SheetTitle>
                        <Link href="/" className="flex items-center space-x-2" onClick={() => setMobileMenuOpen(false)}>
                            <span className="font-headline text-2xl font-bold">Furnishr</span>
                        </Link>
                     </SheetTitle>
                  </SheetHeader>
                  
                  <div className="mt-8 flex-grow">
                    <nav className="flex flex-col space-y-4 pr-6">
                      <p className="text-sm font-semibold text-muted-foreground">Shop</p>
                      {navLinks.slice(0, 5).map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={cn(
                            "text-lg font-medium transition-colors hover:text-primary",
                            pathname.startsWith(link.href) ? "text-primary" : "text-foreground"
                          )}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </nav>
                     <Separator className="my-6" />
                    <nav className="flex flex-col space-y-4 pr-6">
                        <p className="text-sm font-semibold text-muted-foreground">Company</p>
                        {navLinks.slice(5).map((link) => (
                           <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={cn(
                                "text-lg font-medium transition-colors hover:text-primary",
                                pathname.startsWith(link.href) ? "text-primary" : "text-foreground"
                            )}
                            >
                            {link.label}
                            </Link>
                        ))}
                        <Link href="/contact" className="text-lg font-medium text-foreground hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                          Contact
                        </Link>
                         <Link href="/faq" className="text-lg font-medium text-foreground hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
                          FAQs
                        </Link>
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
    </header>
  );
}
