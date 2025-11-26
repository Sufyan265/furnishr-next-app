
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, Trash2, ArrowLeft, Lock, CreditCard, ShoppingBag } from 'lucide-react';
import { getImage } from '@/lib/placeholder-images';
import { siteWideSale } from '@/lib/data';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const discountedSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const originalSubtotal = cart.reduce((sum, item) => {
    const isSaleApplicable = siteWideSale.isActive && !['ambassador-park-lane-bed', 'astral-sleigh-bed', 'divan-ottoman-bed'].includes(item.slug);
    let itemPrice = item.price;
    if (isSaleApplicable) {
      itemPrice = item.price / (1 - siteWideSale.discountPercentage / 100);
    }
    return sum + itemPrice * item.quantity;
  }, 0);

  const shipping = discountedSubtotal > 250 || discountedSubtotal === 0 ? 0 : 49.99;
  const total = discountedSubtotal + shipping;
  const totalSavings = originalSubtotal - discountedSubtotal;

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <ShoppingBag className="mx-auto h-24 w-24 text-muted-foreground" />
        <h1 className="mt-8 font-headline text-4xl font-bold">Your Cart is Empty</h1>
        <p className="mt-4 text-lg text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
        <Button asChild size="lg" className="mt-8">
          <Link href="/products">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Continue Shopping
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-secondary/30">
      <div className="container mx-auto px-4 py-16">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-center mb-12">Your Shopping Cart</h1>
        <div className="grid lg:grid-cols-3 lg:gap-12">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {cart.map(item => {
                    const isSaleApplicable = siteWideSale.isActive && !['ambassador-park-lane-bed', 'astral-sleigh-bed', 'divan-ottoman-bed'].includes(item.slug);
                    
                    const itemPrice = item.price;
                    let itemOriginalPrice = item.price;

                    if (isSaleApplicable) {
                        itemOriginalPrice = item.price / (1 - (siteWideSale.discountPercentage / 100));
                    }

                    return (
                    <div key={item.id + (item.variant?.size || '') + (item.withMattress ? '-mattress' : '')} className="flex items-center p-4 sm:p-6">
                      <div className="relative h-24 w-24 sm:h-32 sm:w-32 rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src={getImage(item.imageIds[0]).imageUrl}
                          alt={item.name}
                          data-ai-hint={getImage(item.imageIds[0]).imageHint}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="ml-4 sm:ml-6 flex-grow grid sm:grid-cols-2 gap-4 items-center">
                        <div>
                          <h3 className="font-headline text-lg sm:text-xl font-semibold">
                            <Link href={`/products/${item.slug}`}>{item.name}</Link>
                          </h3>
                          {item.variant && <p className="text-muted-foreground text-sm">{item.variant.size}</p>}
                          {item.withMattress && <p className="text-sm text-primary font-medium">+ Mattress</p>}
                          <p className="text-muted-foreground text-sm">{item.category}</p>
                          <div className="mt-2">
                             <p className="text-lg font-bold text-destructive">£{itemPrice.toFixed(2)}</p>
                             {isSaleApplicable && <p className="text-sm text-muted-foreground line-through">£{itemOriginalPrice.toFixed(2)}</p>}
                          </div>
                        </div>
                        <div className="flex items-center justify-between sm:justify-self-end sm:flex-col sm:items-end sm:gap-2">
                          <div className="flex items-center border rounded-md">
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity - 1, item.variant?.size)} disabled={item.quantity === 1}>
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1, item.variant?.size)}>
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => removeFromCart(item.id, item.variant?.size)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )})}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1 mt-8 lg:mt-0">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">£{discountedSubtotal.toFixed(2)}</span>
                </div>
                 {totalSavings > 0.01 && (
                  <>
                    <div className="flex justify-between text-destructive">
                      <span className="font-semibold">Sale Discount</span>
                      <span className="font-semibold">-£{totalSavings.toFixed(2)}</span>
                    </div>
                     <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Original price</span>
                      <span className="line-through">£{originalSubtotal.toFixed(2)}</span>
                    </div>
                  </>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-semibold">{shipping === 0 ? 'Free' : `£${shipping.toFixed(2)}`}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>£{total.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-4">
                <Button size="lg" className="w-full font-bold" asChild>
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
                <div className="flex items-center justify-center space-x-4 text-muted-foreground">
                  <Lock className="h-5 w-5" />
                  <CreditCard className="h-5 w-5" />
                  <span className="text-sm">Secure Payments</span>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
