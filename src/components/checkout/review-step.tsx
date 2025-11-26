
"use client";

import Image from 'next/image';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import type { ShippingFormData, PaymentFormData } from '@/app/checkout/page';
import { siteWideSale } from '@/lib/data';
import { getImage } from '@/lib/placeholder-images';

interface ReviewStepProps {
  shippingData: ShippingFormData;
  paymentData: PaymentFormData;
  onPlaceOrder: () => void;
  onBack: () => void;
}

export default function ReviewStep({ shippingData, paymentData, onPlaceOrder, onBack }: ReviewStepProps) {
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
            <p className="text-muted-foreground text-sm">
              Card ending in •••• {paymentData.cardNumber.slice(-4)}
            </p>
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
        <CardFooter className="flex-col gap-4">
            <div className="flex justify-between items-center w-full">
                <Button type="button" variant="outline" onClick={onBack}>
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Back to Payment
                </Button>
                <Button size="lg" className="font-bold" onClick={onPlaceOrder}>
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Place Order
                </Button>
            </div>
        </CardFooter>
      </Card>
    </div>
  );
}
