
"use client";

import { useState } from 'react';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { z } from 'zod';
import CheckoutStepper from '@/components/checkout/checkout-stepper';
import ShippingForm, { shippingFormSchema } from '@/components/checkout/shipping-form';
import ReviewStep from '@/components/checkout/review-step';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { siteWideSale } from '@/lib/data';

export type ShippingFormData = z.infer<typeof shippingFormSchema>;

type CheckoutStep = 'shipping' | 'review';

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const { toast } = useToast();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping');
  const [shippingData, setShippingData] = useState<ShippingFormData | null>(null);

  const handleShippingSubmit = (data: ShippingFormData) => {
    setShippingData(data);
    setCurrentStep('review');
  };

  const handlePlaceOrder = () => {
    // In a real app, this is where you would process the payment and create the order
    console.log("Placing order with:", { shippingData, cart });

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

    let message = `New Order Received!\n\n`;
    message += `*Payment Method*: Cash on Delivery\n\n`;
    message += `*Customer Details*:\n`;
    message += `Name: ${shippingData?.fullName}\n`;
    message += `Email: ${shippingData?.email}\n`;
    message += `Address: ${shippingData?.address}, ${shippingData?.city}, ${shippingData?.postcode}, ${shippingData?.country}\n\n`;
    message += `*Order Items*:\n`;
    cart.forEach(item => {
        message += `- ${item.name} (x${item.quantity}) - £${(item.price * item.quantity).toFixed(2)}\n`;
        if (item.variant) {
            message += `  Size: ${item.variant.size}\n`;
        }
    });
    message += `\n*Total: £${total.toFixed(2)}*`;

    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '1234567890';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    // Simulate API call
    toast({
        title: "Order Placed!",
        description: "Thank you for your purchase. We will contact you for confirmation.",
    });

    clearCart();
    
    window.location.href = whatsappUrl;
  };

  const steps: { id: CheckoutStep; name: string }[] = [
    { id: 'shipping', name: 'Shipping' },
    { id: 'review', name: 'Review & Confirm' },
  ];

  if (cart.length === 0 && currentStep !== 'review') {
    return (
      <div className="container mx-auto px-4 py-16 md:py-24 text-center">
        <ShoppingBag className="mx-auto h-24 w-24 text-muted-foreground" />
        <h1 className="mt-8 font-headline text-4xl font-bold">Your Cart is Empty</h1>
        <p className="mt-4 text-lg text-muted-foreground">You can't proceed to checkout with an empty cart.</p>
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
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="max-w-2xl mx-auto">
        <CheckoutStepper steps={steps} currentStep={currentStep} />
        
        <div className="mt-12">
            {currentStep === 'shipping' && (
                <ShippingForm onSubmit={handleShippingSubmit} />
            )}

            {currentStep === 'review' && shippingData && (
                <ReviewStep
                    shippingData={shippingData}
                    onPlaceOrder={handlePlaceOrder}
                    onBack={() => setCurrentStep('shipping')}
                />
            )}
        </div>
      </div>
    </div>
  );
}
