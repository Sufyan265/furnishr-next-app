"use client";

import { useState, useEffect } from 'react';
import { X, Truck } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function DeliveryBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const bannerDismissed = sessionStorage.getItem('deliveryBannerDismissed');
    if (bannerDismissed !== 'true') {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('deliveryBannerDismissed', 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="bg-primary text-primary-foreground overflow-hidden"
        >
          <div className="container mx-auto px-4 h-10 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Truck className="h-5 w-5" />
              <span>Free UK Delivery on orders over £250</span>
            </div>
            <button
              onClick={handleDismiss}
              aria-label="Dismiss delivery banner"
              className="p-1 rounded-full hover:bg-primary-foreground/20 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
