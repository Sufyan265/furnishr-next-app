"use client";

import Link from "next/link";
import { Search, ShoppingCart, User, Wand2, Menu, X, Heart, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";

const navLinks = [
  { href: "/products", label: "All Products" },
  { href: "/products?category=living-room", label: "Living Room" },
  { href: "/products?category=bedroom", label: "Bedroom" },
  { href: "/products?category=dining", label: "Dining" },
  { href: "/products?category=office", label: "Office" },
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
        <Link href="/" className="mr-4 flex items-center space-x-2 lg:mr-6">
          <span className="font-headline text-2xl font-bold">Furnishr</span>
        </Link>
        
        <div className="flex flex-1 items-center justify-end">
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navLinks.slice(1,5).map((link) => ( // Show main categories on desktop
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors hover:text-primary",
                  pathname === link.href ? "text-primary" : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-1 sm:space-x-2 ml-auto">
            <Button variant="ghost" size="icon" asChild className="hidden md:inline-flex">
              <Link href="/style-matcher" aria-label="AI Style Matcher">
                <Wand2 className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild className="hidden md:inline-flex">
              <Link href="/ai-assistant" aria-label="AI Assistant">
                <Sparkles className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" disabled className="hidden md:inline-flex">
              <Search className="h-5 w-5" />
            </Button>
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
            <Button variant="ghost" size="icon" disabled className="hidden md:inline-flex">
              <User className="h-5 w-5" />
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
                <SheetContent side="left" className="pr-0">
                  <Link href="/" className="mr-6 flex items-center space-x-2" onClick={() => setMobileMenuOpen(false)}>
                    <span className="font-headline text-2xl font-bold">Furnishr</span>
                  </Link>
                  <div className="my-8 h-full">
                    <nav className="flex flex-col items-start space-y-6">
                      {navLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={cn(
                            "text-lg font-medium transition-colors hover:text-primary",
                            pathname === link.href ? "text-primary" : "text-muted-foreground"
                          )}
                        >
                          {link.label}
                        </Link>
                      ))}
                       <div className="flex flex-col space-y-4 pt-6 border-t w-full pr-6">
                           <Link href="/style-matcher" className="flex items-center text-lg font-medium text-muted-foreground" onClick={() => setMobileMenuOpen(false)}><Wand2 className="mr-3 h-5 w-5"/> AI Styler</Link>
                           <Link href="/ai-assistant" className="flex items-center text-lg font-medium text-muted-foreground" onClick={() => setMobileMenuOpen(false)}><Sparkles className="mr-3 h-5 w-5"/> AI Assistant</Link>
                           <Link href="/contact" className="flex items-center text-lg font-medium text-muted-foreground" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
                        </div>
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
