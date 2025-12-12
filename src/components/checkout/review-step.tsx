
"use client";

import Image from 'next/image';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, CheckCircle, Wallet } from 'lucide-react';
import type { ShippingFormData } from '@/app/checkout/page';
import { siteWideSale } from '@/lib/data';
import { getImage } from '@/lib/placeholder-images';

interface ReviewStepProps {
  shippingData: ShippingFormData;
  onPlaceOrder: () => void;
  onBack: () => void;
  isPlacingOrder?: boolean;
}

export default function ReviewStep({ shippingData, onPlaceOrder, onBack, isPlacingOrder = false }: ReviewStepProps) {
  const { cart } = useCart();
  const discountedSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  const originalSubtotal = cart.reduce((sum, item) => {
    const isSaleApplicable = siteWideSale.isActive && !['ambassador-park-lane-bed', 'astral-sleigh-bed', 'divan-ottoman-bed'].includes(item.slug);
    let itemPrice = item.price;
    if (isSaleApplicable) {
      itemPrice = item.price / (1 - siteWideSale.discountPercentage / 100);
    }
    return sum + itemPrice * item.quantity;
  }, 0);

  const shipping = discountedSubtotal > 250 ? 0 : 49.99;
  const total = discountedSubtotal + shipping;
  const totalSavings = originalSubtotal - discountedSubtotal;

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Review Your Order</CardTitle>
          <CardDescription>Please check your order details below before placing your order.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Shipping Details */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Shipping To</h3>
            <div className="text-muted-foreground text-sm space-y-1">
              <p>{shippingData.fullName}</p>
              <p>{shippingData.address}</p>
              <p>{shippingData.city}, {shippingData.postcode}</p>
              <p>{shippingData.country}</p>
            </div>
          </div>
          <Separator />
          {/* Payment Details */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Payment Method</h3>
            <div className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-muted-foreground" />
                <p className="text-muted-foreground text-sm font-semibold">
                Cash on Delivery
                </p>
            </div>
          </div>
          <Separator />
          {/* Order Summary */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
            <div className="space-y-4">
              {cart.map(item => (
                <div key={item.id + (item.variant?.size || '')} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Image
                      src={getImage(item.imageIds[0]).imageUrl}
                      alt={item.name}
                      data-ai-hint={getImage(item.imageIds[0]).imageHint}
                      width={64}
                      height={64}
                      className="rounded-md object-cover"
                    />
                    <div>
                      <p className="font-semibold">{item.name} <span className="text-muted-foreground text-sm">x {item.quantity}</span></p>
                      {item.variant && <p className="text-sm text-muted-foreground">{item.variant.size}</p>}
                      {item.selectedColor && (
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-3 h-3 rounded-full border border-border" style={{ backgroundColor: item.selectedColor.hex }}></div>
                          <p className="text-xs text-muted-foreground">{item.selectedColor.name}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="font-semibold">£{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Final pricing */}
      <Card>
        <CardHeader>
          <CardTitle>Total Cost</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-semibold">£{discountedSubtotal.toFixed(2)}</span>
          </div>
          {totalSavings > 0.01 && (
            <div className="flex justify-between text-destructive">
                <span className="font-semibold">Sale Discount</span>
                <span className="font-semibold">-£{totalSavings.toFixed(2)}</span>
            </div>
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
        <CardFooter>
            <div className="flex flex-col-reverse sm:flex-row-reverse gap-4 w-full">
                <Button size="lg" className="font-bold w-full sm:w-auto" onClick={onPlaceOrder} disabled={isPlacingOrder}>
                    <CheckCircle className="mr-2 h-5 w-5" />
                    {isPlacingOrder ? 'Processing...' : 'Place Order'}
                </Button>
                <Button type="button" variant="outline" onClick={onBack} className="w-full sm:w-auto" disabled={isPlacingOrder}>
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Back to Shipping
                </Button>
            </div>
        </CardFooter>
      </Card>
    </div>
  );
}
