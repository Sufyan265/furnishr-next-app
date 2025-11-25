
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/cart-context';
import { useToast } from '@/hooks/use-toast';
import { Minus, Plus, ShoppingCart, Percent, Bed } from 'lucide-react';
import type { Product, ProductVariant } from '@/lib/types';
import { getImages } from '@/lib/placeholder-images';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';
import CountdownTimer from './countdown-timer';
import { siteWideSale } from '@/lib/data';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';

interface ProductInteractionProps {
  product: Product;
}

const StockBadge = ({ stock }: { stock: number }) => {
  if (stock === 0) {
    return <Badge variant="destructive">Out of Stock</Badge>;
  }
  if (stock <= 5) {
    return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">Low Stock ({stock} left)</Badge>;
  }
  return <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">In Stock</Badge>;
};

export default function ProductInteraction({ product }: ProductInteractionProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(product.variants?.[0]);
  const [withMattress, setWithMattress] = useState(false);

  const { addToCart } = useCart();
  const { toast } = useToast();

  const productImages = getImages(product.imageIds);

  const basePrice = selectedVariant?.price || product.price;
  let mattressPrice = 0;
  if(withMattress) {
    if(selectedVariant) {
        mattressPrice = selectedVariant.mattressPrice || 0;
    } else {
        mattressPrice = product.mattressPrice || 0;
    }
  }

  const finalPrice = withMattress ? mattressPrice : basePrice;
  
  const isSiteWideSaleActive = siteWideSale.isActive && product.slug !== 'ambassador-park-lane-bed';
  const individualDeal = product.deal && new Date(product.deal.expiresAt) > new Date();

  let displayPrice = finalPrice;
  let originalPrice = finalPrice;
  let discountPercentage = 0;
  let isDealActive = false;

  if (isSiteWideSaleActive) {
    displayPrice = finalPrice * (1 - siteWideSale.discountPercentage / 100);
    discountPercentage = siteWideSale.discountPercentage;
    isDealActive = true;
  } else if (individualDeal) {
    displayPrice = finalPrice * (1 - product.deal.discountPercentage / 100);
    discountPercentage = product.deal.discountPercentage;
    isDealActive = true;
  } else {
    originalPrice = finalPrice;
  }

  const handleAddToCart = () => {
    addToCart({ ...product, price: displayPrice }, quantity, selectedVariant, withMattress);
    let description = `${quantity} x ${product.name}`;
    if (selectedVariant) {
        description += ` (${selectedVariant.size})`;
    }
    if (withMattress) {
        description += ' with Mattress';
    }
    description += ' has been added to your cart.';

    toast({
      title: "Added to Cart",
      description: description,
    });
  };

  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity > 0 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleVariantChange = (variantSize: string) => {
    const variant = product.variants?.find(v => v.size === variantSize);
    setSelectedVariant(variant);
  }
  
  const hasMattressOption = (product.variants?.some(v => v.mattressPrice && v.mattressPrice > 0) || (product.mattressPrice && product.mattressPrice > 0));


  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
      <div>
        <Carousel className="w-full" setApi={(api) => api?.on("select", () => setSelectedImageIndex(api.selectedScrollSnap()))}>
          <CarouselContent>
            {productImages.map((image, index) => (
              <CarouselItem key={index}>
                <div className="aspect-square relative rounded-lg overflow-hidden border bg-card">
                  <Image
                    src={image.imageUrl}
                    alt={`${product.name} - image ${index + 1}`}
                    data-ai-hint={image.imageHint}
                    fill
                    className="object-cover"
                  />
                  {isDealActive && (
                    <Badge className="absolute top-4 left-4 text-lg bg-destructive hover:bg-destructive">
                      <Percent className="mr-2 h-5 w-5" /> {discountPercentage}% OFF
                    </Badge>
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
        <div className="flex gap-2 mt-4 justify-center">
            {productImages.map((image, index) => (
                <button
                    key={index}
                    className={`w-20 h-20 relative rounded-md overflow-hidden border-2 ${index === selectedImageIndex ? 'border-primary' : 'border-transparent'}`}
                    onClick={() => { /* This should be handled by carousel api but click is a good fallback */ }}
                >
                    <Image src={image.imageUrl} alt={`thumbnail ${index+1}`} fill className="object-cover" />
                </button>
            ))}
        </div>
      </div>

      <div className="flex flex-col justify-center">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">{product.category}</p>
          <h1 className="font-headline text-3xl md:text-4xl font-bold">{product.name}</h1>
          
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-baseline gap-3">
              <p className={cn(
                "text-3xl font-semibold text-primary",
                isDealActive && "text-destructive"
              )}>
                £{displayPrice.toFixed(2)}
              </p>
              {isDealActive && (
                <p className="text-xl font-medium text-muted-foreground line-through">
                  £{originalPrice.toFixed(2)}
                </p>
              )}
            </div>
            <StockBadge stock={product.stock} />
          </div>

          {product.variants && (
            <div className="space-y-2">
              <Label className="font-semibold">Size</Label>
              <RadioGroup
                defaultValue={selectedVariant?.size}
                onValueChange={handleVariantChange}
                className="flex items-center gap-4"
              >
                {product.variants.map(variant => (
                  <div key={variant.size} className="flex items-center">
                    <RadioGroupItem value={variant.size} id={`size-${variant.size}`} />
                    <Label htmlFor={`size-${variant.size}`} className="ml-2 cursor-pointer">{variant.size}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {hasMattressOption && (
            <>
            <Separator />
            <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                        <Bed className="h-5 w-5 text-primary"/>
                        <Label htmlFor="mattress-switch" className="text-base font-semibold">
                            Add a Mattress
                        </Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Complete your purchase with a premium mattress.
                    </p>
                </div>
                <Switch 
                    id="mattress-switch"
                    checked={withMattress}
                    onCheckedChange={setWithMattress}
                />
            </div>
            </>
          )}


          {individualDeal && !isSiteWideSaleActive && (
            <div className="space-y-2">
                <p className="text-sm font-semibold text-destructive">Limited Time Offer! Ends in:</p>
                <CountdownTimer targetDate={product.deal!.expiresAt} />
            </div>
          )}

          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2 border rounded-md p-1">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(-1)} disabled={quantity === 1}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center font-bold">{quantity}</span>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(1)} disabled={quantity >= product.stock || product.stock === 0}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button size="lg" className="w-full font-bold" onClick={handleAddToCart} disabled={product.stock === 0}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
