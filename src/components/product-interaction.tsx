
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
import { Minus, Plus, ShoppingCart, Percent, Bed, Truck, PackageCheck, ShieldCheck, Lock, ShieldAlert, Phone, Mail, Palette } from 'lucide-react';
import type { Product, ProductVariant, ProductColor } from '@/lib/types';
import { getImages, getImage } from '@/lib/placeholder-images';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';
import CountdownTimer from './countdown-timer';
import { siteWideSale } from '@/lib/data';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import Link from 'next/link';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface ProductInteractionProps {
  product: Product;
  isQuickView?: boolean;
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

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

const ColorSelector = ({ colors, selectedColor, onSelectColor }: { colors: ProductColor[], selectedColor: ProductColor, onSelectColor: (color: ProductColor) => void }) => {
  const swatchImage = getImage('product-color-swatches');
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <Label className="font-semibold">Color: <span className="font-normal text-muted-foreground">{selectedColor.name}</span></Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer">
                <Palette className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">View Swatches</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <Image src={swatchImage.imageUrl} alt="Color Swatches" width={200} height={300} />
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex flex-wrap gap-2">
        {colors.map(color => (
          <TooltipProvider key={color.name}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => onSelectColor(color)}
                  className={cn(
                    "w-8 h-8 rounded-full border-2 transition-all",
                    selectedColor.name === color.name ? 'border-primary scale-110' : 'border-border'
                  )}
                  style={{ backgroundColor: color.hex }}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{color.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  )
};


export default function ProductInteraction({ product, isQuickView = false }: ProductInteractionProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(product.variants?.[0]);
  const [withMattress, setWithMattress] = useState(false);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors?.[0] || { name: 'Default', hex: '#ccc' });
  const [carouselApi, setCarouselApi] = useState<any>(null);

  const { addToCart } = useCart();
  const { toast } = useToast();

  const productImages = getImages(product.imageIds);

  useEffect(() => {
    if (!carouselApi) return;

    carouselApi.on("select", () => {
      setSelectedImageIndex(carouselApi.selectedScrollSnap());
    });

    return () => {
      carouselApi.off("select");
    };
  }, [carouselApi]);

  const basePrice = selectedVariant?.price || product.price;
  let mattressPrice = 0;
  if (withMattress) {
    if (selectedVariant) {
      mattressPrice = selectedVariant.mattressPrice || 0;
    } else {
      mattressPrice = product.mattressPrice || 0;
    }
  }

  const finalPrice = withMattress ? mattressPrice : basePrice;

  const isSiteWideSaleActive = siteWideSale.isActive && !['ambassador-park-lane-bed', 'astral-sleigh-bed', 'divan-ottoman-bed'].includes(product.slug);
  const individualDeal = product.deal && new Date(product.deal.expiresAt) > new Date();

  let displayPrice = finalPrice;
  let originalPrice = finalPrice;
  let discountPercentage = 0;
  let isDealActive = false;

  if (isSiteWideSaleActive) {
    displayPrice = finalPrice; // The price from data is the discounted price
    originalPrice = finalPrice / (1 - siteWideSale.discountPercentage / 100); // Calculate original price
    discountPercentage = siteWideSale.discountPercentage;
    isDealActive = true;
  } else if (individualDeal) {
    displayPrice = finalPrice; // The price from data is the discounted price
    originalPrice = finalPrice / (1 - product.deal!.discountPercentage / 100); // Calculate original price
    discountPercentage = product.deal!.discountPercentage;
    isDealActive = true;
  } else {
    displayPrice = finalPrice;
    originalPrice = finalPrice;
  }

  const dimensions = selectedVariant?.dimensions || product.dimensions;

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

  const variantLabel = product.categorySlug === 'beds' ? 'Size' : 'Seater';

  if (isQuickView) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Carousel className="w-full" setApi={setCarouselApi}>
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
                onClick={() => carouselApi?.scrollTo(index)}
              >
                <Image src={image.imageUrl} alt={`thumbnail ${index + 1}`} fill className="object-cover" />
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
                <Label className="font-semibold">{variantLabel}</Label>
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

            {product.colors && (
              <>
                <ColorSelector colors={product.colors} selectedColor={selectedColor} onSelectColor={setSelectedColor} />
                <Separator />
              </>
            )}

            {dimensions && (
              <div>
                <h3 className="font-semibold mb-1">Dimensions</h3>
                <div className="space-y-1 text-muted-foreground text-sm">
                  <p><strong>Width:</strong> {dimensions.width}</p>
                  <p><strong>Height:</strong> {dimensions.height}</p>
                  <p><strong>Depth:</strong> {dimensions.depth}</p>
                </div>
              </div>
            )}

            <Separator />
            <div className="text-sm text-muted-foreground bg-accent/30 p-4 rounded-lg border border-dashed">
              <p className="mb-2">For available sizes, please check our <Button asChild variant="link" className="p-0 h-auto"><Link href="/size-guide">Size Guide</Link></Button>.</p>
              <p>For customized size options that perfectly fit your space, please contact us:</p>
              <div className="flex items-center gap-4 mt-2">
                <a href="mailto:orders@furnishr.co.uk" className="flex items-center gap-1 text-primary hover:underline">
                  <Mail className="h-4 w-4" /> Email
                </a>
                {whatsappNumber && (
                  <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-primary hover:underline">
                    <Phone className="h-4 w-4" /> WhatsApp
                  </a>
                )}
              </div>
            </div>
            <Separator />

            {hasMattressOption && (
              <>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Bed className="h-5 w-5 text-primary" />
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
                <Separator />
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
    )
  }

  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
      <div>
        <Carousel className="w-full" setApi={setCarouselApi}>
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
              onClick={() => carouselApi?.scrollTo(index)}
            >
              <Image src={image.imageUrl} alt={`thumbnail ${index + 1}`} fill className="object-cover" />
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
              <Label className="font-semibold">{variantLabel}</Label>
              <RadioGroup
                value={selectedVariant?.size}
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

          {product.colors && (
            <>
              <ColorSelector colors={product.colors} selectedColor={selectedColor} onSelectColor={setSelectedColor} />
              <Separator />
            </>
          )}

          {dimensions && (
            <div>
              <h3 className="font-semibold mb-1">Dimensions</h3>
              <div className="space-y-1 text-muted-foreground text-sm">
                <p><strong>Width:</strong> {dimensions.width}</p>
                <p><strong>Height:</strong> {dimensions.height}</p>
                <p><strong>Depth:</strong> {dimensions.depth}</p>
              </div>
            </div>
          )}

          <Separator />
          <div className="text-sm text-muted-foreground bg-accent/30 p-4 rounded-lg border border-dashed">
            <p className="mb-2">For available sizes, please check our <Button asChild variant="link" className="p-0 h-auto"><Link href="/size-guide">Size Guide</Link></Button>.</p>
            <p>For customized size options that perfectly fit your space, please contact us:</p>
            <div className="flex items-center gap-4 mt-2">
              <a href="mailto:orders@furnishr.co.uk" className="flex items-center gap-1 text-primary hover:underline">
                <Mail className="h-4 w-4" /> Email
              </a>
              {whatsappNumber && (
                <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-primary hover:underline">
                  <Phone className="h-4 w-4" /> WhatsApp
                </a>
              )}
            </div>
          </div>
          <Separator />

          {hasMattressOption && (
            <>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Bed className="h-5 w-5 text-primary" />
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
              <Separator />
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
