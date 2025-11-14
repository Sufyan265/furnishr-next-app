"use client";

import { useState, useEffect } from 'react';
import { X, Gift } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { siteWideSale } from '@/lib/data';

export default function DeliveryBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show banner if the sale is active, and it hasn't been dismissed
    const bannerDismissed = sessionStorage.getItem('saleBannerDismissed');
    if (siteWideSale.isActive && bannerDismissed !== 'true') {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('saleBannerDismissed', 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="bg-destructive text-destructive-foreground overflow-hidden"
        >
          <div className="container mx-auto px-4 h-12 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm md:text-base font-medium">
              <Gift className="h-6 w-6" />
              <span>
                <strong>{siteWideSale.name}:</strong> {siteWideSale.discountPercentage}% off all products!
              </span>
            </div>
            <button
              onClick={handleDismiss}
              aria-label="Dismiss delivery banner"
              className="p-1 rounded-full hover:bg-destructive-foreground/20 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
