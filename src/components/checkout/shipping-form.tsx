
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export const shippingFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }),
  city: z.string().min(2, { message: "City must be at least 2 characters." }),
  postcode: z.string().min(4, { message: "Postcode must be at least 4 characters." }),
  country: z.string().min(2, { message: "Country must be at least 2 characters." }),
});

type ShippingFormValues = z.infer<typeof shippingFormSchema>;

interface ShippingFormProps {
  onSubmit: (data: ShippingFormValues) => void;
}

export default function ShippingForm({ onSubmit }: ShippingFormProps) {
  const form = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      address: "",
      city: "",
      postcode: "",
      country: "United Kingdom",
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Shipping Details</CardTitle>
        <CardDescription>Enter your address to receive your order.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Design Street" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="md:col-span-1">
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="London" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="postcode"
                render={({ field }) => (
                  <FormItem className="md:col-span-1">
                    <FormLabel>Postcode</FormLabel>
                    <FormControl>
                      <Input placeholder="EC1V 9DD" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem className="md:col-span-1">
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" size="lg">
                Continue to Payment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
