
import type { ImagePlaceholder } from "./placeholder-images";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  price: number;
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
  stock: number;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
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
}

export type WishlistItem = Product;

export interface Faq {
  id: string;
  question: string;
  answer: string;
  category: 'Ordering' | 'Shipping & Delivery' | 'Returns & Exchanges' | 'Product Information';
}
