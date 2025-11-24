
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { CartItem, Product, ProductVariant } from '@/lib/types';
import { siteWideSale } from '@/lib/data';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number, variant?: ProductVariant, withMattress?: boolean) => void;
  removeFromCart: (productId: string, variantSize?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantSize?: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('furnishr_cart');
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('furnishr_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, quantity: number, variant?: ProductVariant, withMattress?: boolean) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => 
        item.id === product.id && 
        item.variant?.size === variant?.size &&
        item.withMattress === withMattress
      );
      
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id && item.variant?.size === variant?.size && item.withMattress === withMattress
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      let price = product.price;

      const cartItem: CartItem = { ...product, quantity, price, variant, withMattress };
      
      return [...prevCart, cartItem];
    });
  };

  const removeFromCart = (productId: string, variantSize?: string) => {
    setCart(prevCart => prevCart.filter(item => 
      !(item.id === productId && item.variant?.size === variantSize)
    ));
  };

  const updateQuantity = (productId: string, quantity: number, variantSize?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantSize);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId && item.variant?.size === variantSize
         ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
