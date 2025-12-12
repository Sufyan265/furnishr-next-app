
import type { ImagePlaceholder } from "./placeholder-images";

export interface ProductVariant {
  size: string;
  price: number;
  mattressPrice?: number;
  dimensions?: {
    width: string;
    height: string;
    depth: string;
  };
}

export interface ProductColor {
  name: string;
  hex: string;
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
  colors?: ProductColor[];
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
  upvotes?: number;
  downvotes?: number;
}

export interface Answer {
  id: string;
  authorName: string;
  customerId: string;
  answerText: string;
  createdAt: string; 
  isOfficial?: boolean;
}

export interface Question {
  id: string;
  authorName: string;
  customerId: string;
  questionText: string;
  createdAt: string;
  answers: Answer[];
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
  selectedColor?: ProductColor;
}

export type WishlistItem = Product;

export interface Faq {
  id: string;
  question: string;
  answer: string;
  category: 'Ordering' | 'Shipping & Delivery' | 'Returns & Exchanges' | 'Product Information' | 'Care & Cleaning';
}

export interface Address {
  id: string;
  type: 'Home' | 'Work' | 'Other';
  street: string;
  city: string;
  postcode: string;
  country: string;
  isDefault: boolean;
}
