"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitContactForm, ContactFormValues, formSchema } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";
import type { Metadata } from 'next';

// Since this is a client component, we can't export metadata directly.
// It would need to be in a parent layout or page file.
// For this app structure, we'll omit dynamic metadata for this page.


export default function ContactPage() {
  const { toast } = useToast();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = async (data: ContactFormValues) => {
    const result = await submitContactForm(data);
    if (result.success) {
      toast({
        title: "Message Sent!",
        description: result.message,
      });
      form.reset();
    } else {
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: result.message,
      });
    }
  };

  return (
    <div className="bg-secondary/30">
        <section className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
                <h1 className="font-headline text-4xl md:text-5xl font-bold">Get in Touch</h1>
                <p className="mt-4 text-lg text-muted-foreground">
                    Have a question or a comment? We'd love to hear from you.
                </p>
            </div>
            <div className="mt-16 grid lg:grid-cols-5 gap-12">
                <div className="lg:col-span-3">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl">Send us a Message</CardTitle>
                        <CardDescription>Our team will get back to you within 24 hours.</CardDescription>
                    </CardHeader>
                    <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="name"
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
                                        <FormLabel>Email Address</FormLabel>
                                        <FormControl>
                                            <Input placeholder="you@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Your Message</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Tell us how we can help..." className="min-h-[120px]" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={form.formState.isSubmitting} className="w-full">
                                {form.formState.isSubmitting ? 'Sending...' : 'Send Message'}
                            </Button>
                        </form>
                    </Form>
                    </CardContent>
                </Card>
                </div>
                <div className="lg:col-span-2 space-y-8">
                    <div className="flex items-start gap-4">
                        <div className="bg-primary/10 text-primary p-3 rounded-full">
                            <Mail className="h-6 w-6"/>
                        </div>
                        <div>
                            <h3 className="font-headline text-xl font-semibold">Email Us</h3>
                            <p className="text-muted-foreground">For general inquiries and support.</p>
                            <a href="mailto:hello@furnishr.co.uk" className="text-primary font-medium hover:underline">hello@furnishr.co.uk</a>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="bg-primary/10 text-primary p-3 rounded-full">
                            <Phone className="h-6 w-6"/>
                        </div>
                        <div>
                            <h3 className="font-headline text-xl font-semibold">Call Us</h3>
                            <p className="text-muted-foreground">Mon - Fri, 9am - 5pm GMT</p>
                            <a href="tel:+442012345678" className="text-primary font-medium hover:underline">+44 (0)20 1234 5678</a>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="bg-primary/10 text-primary p-3 rounded-full">
                            <MapPin className="h-6 w-6"/>
                        </div>
                        <div>
                            <h3 className="font-headline text-xl font-semibold">Our Office</h3>
                            <p className="text-muted-foreground">123 Design Street<br/>London, EC1V 9DD<br/>United Kingdom</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  );
}
