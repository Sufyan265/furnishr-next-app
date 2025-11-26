
"use client";

import { useState } from 'react';
import { useCart } from '@/context/cart-context';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { z } from 'zod';
import CheckoutStepper from '@/components/checkout/checkout-stepper';
import ShippingForm, { shippingFormSchema } from '@/components/checkout/shipping-form';
import PaymentForm, { paymentFormSchema } from '@/components/checkout/payment-form';
import ReviewStep from '@/components/checkout/review-step';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export type ShippingFormData = z.infer<typeof shippingFormSchema>;
export type PaymentFormData = z.infer<typeof paymentFormSchema>;

type CheckoutStep = 'shipping' | 'payment' | 'review';

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const { toast } = useToast();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping');
  const [shippingData, setShippingData] = useState<ShippingFormData | null>(null);
  const [paymentData, setPaymentData] = useState<PaymentFormData | null>(null);

  const handleShippingSubmit = (data: ShippingFormData) => {
    setShippingData(data);
    setCurrentStep('payment');
  };

  const handlePaymentSubmit = (data: PaymentFormData) => {
    setPaymentData(data);
    setCurrentStep('review');
  };

  const handlePlaceOrder = () => {
    // In a real app, this is where you would process the payment and create the order
    console.log("Placing order with:", { shippingData, paymentData, cart });
    
    // Simulate API call
    toast({
        title: "Order Placed!",
        description: "Thank you for your purchase. A confirmation email has been sent.",
    });

    clearCart();
    router.push('/');
  };

  const steps: { id: CheckoutStep; name: string }[] = [
    { id: 'shipping', name: 'Shipping' },
    { id: 'payment', name: 'Payment' },
    { id: 'review', name: 'Review' },
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

            {currentStep === 'payment' && (
                <PaymentForm
                    onSubmit={handlePaymentSubmit}
                    onBack={() => setCurrentStep('shipping')}
                />
            )}

            {currentStep === 'review' && shippingData && paymentData && (
                <ReviewStep
                    shippingData={shippingData}
                    paymentData={paymentData}
                    onPlaceOrder={handlePlaceOrder}
                    onBack={() => setCurrentStep('payment')}
                />
            )}
        </div>
      </div>
    </div>
  );
}
