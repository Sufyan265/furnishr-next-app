
'use client';

import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function NewsletterSignup() {
    return (
        <section className="bg-primary text-primary-foreground">
            <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="font-headline text-3xl font-bold">Join The Furnishr Family</h2>
                    <p className="mt-2 text-primary-foreground/80">
                        Be the first to know about new arrivals, exclusive sales, and interior design inspiration.
                    </p>
                    <form className="mt-6 flex flex-col sm:flex-row w-full max-w-md mx-auto items-center gap-2">
                        <Input type="email" placeholder="Enter your email address" className="bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/60 border-primary-foreground/30 flex-grow" />
                        <Button type="submit" variant="secondary" className="w-full sm:w-auto">Subscribe</Button>
                    </form>
                </div>
            </div>
        </section>
    );
}
