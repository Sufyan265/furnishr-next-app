
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, CreditCard, Lock } from "lucide-react";

export const paymentFormSchema = z.object({
  cardName: z.string().min(2, { message: "Name on card is required." }),
  cardNumber: z.string().regex(/^\d{16}$/, { message: "Card number must be 16 digits." }),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: "Expiry must be in MM/YY format." }),
  cvc: z.string().regex(/^\d{3}$/, { message: "CVC must be 3 digits." }),
});

type PaymentFormValues = z.infer<typeof paymentFormSchema>;

interface PaymentFormProps {
  onSubmit: (data: PaymentFormValues) => void;
  onBack: () => void;
}

export default function PaymentForm({ onSubmit, onBack }: PaymentFormProps) {
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: { cardName: "", cardNumber: "", expiryDate: "", cvc: "" },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Payment Details</CardTitle>
        <CardDescription>Enter your payment information below.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="cardName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name on Card</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Number</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input placeholder="•••• •••• •••• ••••" className="pl-10" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="expiryDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiry Date</FormLabel>
                    <FormControl>
                      <Input placeholder="MM/YY" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cvc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CVC</FormLabel>
                    <FormControl>
                     <div className="relative">
                       <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                       <Input placeholder="•••" className="pl-10" {...field} />
                     </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-between items-center">
              <Button type="button" variant="outline" onClick={onBack}>
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Shipping
              </Button>
              <Button type="submit" size="lg">
                Continue to Review
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
