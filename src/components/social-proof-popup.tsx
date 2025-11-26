
'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { socialProofData } from '@/lib/data';

const { names, locations, productNouns } = socialProofData;

const getRandomItem = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

const generateNotification = () => {
  const name = getRandomItem(names);
  const location = getRandomItem(locations);
  const product = getRandomItem(productNouns);
  return `${name} from ${location} just bought a ${product}.`;
};

export default function SocialProofPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const showNotification = () => {
      setNotification(generateNotification());
      setIsVisible(true);

      setTimeout(() => {
        setIsVisible(false);
      }, 5000); // Hide after 5 seconds
    };
    
    // Initial delay
    const initialTimeout = setTimeout(showNotification, 8000);

    const interval = setInterval(showNotification, 12000); // Show a new notification every 12 seconds

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="flex items-center gap-4 rounded-lg border bg-card p-4 shadow-lg text-sm"
          >
            <div className="bg-primary/10 text-primary p-2 rounded-full">
                <ShoppingCart className="h-5 w-5" />
            </div>
            <p className="font-medium text-card-foreground">{notification}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
