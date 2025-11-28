
"use client";

import { Gift } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { siteWideSale } from '@/lib/data';

export default function DeliveryBanner() {
  if (!siteWideSale.isActive) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="relative text-primary-foreground overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary opacity-90 animate-gradient-x" />
        <div className="relative container mx-auto px-4 h-12 flex items-center justify-center">
          <div className="flex items-center gap-3 text-sm md:text-base font-semibold tracking-wider">
            <Gift className="h-6 w-6 animate-subtle-pulse" />
            <span className="drop-shadow-sm">
              {siteWideSale.name}: {siteWideSale.discountPercentage}% off all products!
            </span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
