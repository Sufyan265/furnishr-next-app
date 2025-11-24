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
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="bg-gradient-to-r from-primary via-destructive to-primary text-primary-foreground overflow-hidden"
      >
        <div className="container mx-auto px-4 h-12 flex items-center justify-center">
          <div className="flex items-center gap-3 text-sm md:text-base font-bold">
            <Gift className="h-6 w-6 animate-pulse" />
            <span>
              {siteWideSale.name}: {siteWideSale.discountPercentage}% off all products!
            </span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
