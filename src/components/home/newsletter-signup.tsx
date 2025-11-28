
'use client';

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useToast } from "@/hooks/use-toast";

export default function NewsletterSignup() {
    const [email, setEmail] = useState('');
    const { toast } = useToast();

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            console.log('Subscribed with:', email);
            toast({
                title: 'Subscribed!',
                description: 'Thank you for joining our newsletter.',
            });
            setEmail('');
        }
    };

    return (
        <section className="bg-primary text-primary-foreground">
            <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="font-headline text-3xl font-bold">Join The Furnishr Family</h2>
                    <p className="mt-2 text-primary-foreground/80">
                        Be the first to know about new arrivals, exclusive sales, and interior design inspiration.
                    </p>
                    <form onSubmit={handleSubscribe} className="mt-6 flex flex-col sm:flex-row w-full max-w-md mx-auto items-center gap-2">
                        <Input 
                            type="email" 
                            placeholder="Enter your email address" 
                            className="bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/60 border-primary-foreground/30 flex-grow"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <Button type="submit" variant="secondary" className="w-full sm:w-auto">Subscribe</Button>
                    </form>
                </div>
            </div>
        </section>
    );
}
