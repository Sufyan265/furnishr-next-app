import type { ImagePlaceholder } from "./placeholder-images";

export interface ProductVariant {
  size: string;
  price: number;
  mattressPrice?: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  price: number;
  variants?: ProductVariant[];
  mattressPrice?: number;
  rating: number;
  reviewCount: number;
  imageIds: string[];
  description: string;
  details: string[];
  dimensions: {
    width: string;
    height: string;
    depth: string;
  };
  style: string;
  material: string;
  color?: string;
  stock: number;
  deal?: {
    discountPercentage: number;
    expiresAt: string;
  };
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  tags?: string[];
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  imageId: string;
  imageUrl: string;
  imageHint: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  author: string;
  date: string;
  imageId: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  imageHint: string;
}

export interface CartItem extends Product {
  quantity: number;
  variant?: ProductVariant;
  withMattress?: boolean;
}

export type WishlistItem = Product;

export interface Faq {
  id: string;
  question: string;
  answer: string;
  category: 'Ordering' | 'Shipping & Delivery' | 'Returns & Exchanges' | 'Product Information';
}

    