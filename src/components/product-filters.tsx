
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Filter, X } from 'lucide-react';
import { products } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import StarRating from './star-rating';
import { Checkbox } from './ui/checkbox';

const allMaterials = [...new Set(products.map(p => p.material).filter(Boolean))];
const allColors = [...new Set(products.map(p => p.color).filter(Boolean))];

export interface FilterState {
    priceRange: [number, number];
    rating: number;
    materials: string[];
    colors: string[];
}

interface ProductFiltersProps {
    filters: FilterState;
    onFiltersChange: (filters: FilterState) => void;
    onClearFilters: () => void;
}

const FilterContent = ({ filters, onFiltersChange, onClearFilters }: ProductFiltersProps) => {
    
    const handleMaterialChange = (material: string) => {
        const newMaterials = filters.materials.includes(material)
            ? filters.materials.filter(m => m !== material)
            : [...filters.materials, material];
        onFiltersChange({ ...filters, materials: newMaterials });
    };

    const handleColorChange = (color: string) => {
        const newColors = filters.colors.includes(color)
            ? filters.colors.filter(c => c !== color)
            : [...filters.colors, color];
        onFiltersChange({ ...filters, colors: newColors });
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-headline text-2xl">Filters</CardTitle>
                <Button variant="ghost" size="sm" onClick={onClearFilters}>Clear All</Button>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Price Filter */}
                <div>
                    <Label className="font-semibold">Price Range</Label>
                    <div className="flex justify-between text-sm text-muted-foreground mt-2">
                        <span>£{filters.priceRange[0]}</span>
                        <span>£{filters.priceRange[1]}</span>
                    </div>
                    <Slider
                        value={filters.priceRange}
                        onValueChange={(value) => onFiltersChange({ ...filters, priceRange: value as [number, number] })}
                        max={2000}
                        step={50}
                        className="mt-2"
                    />
                </div>
                <Separator />
                {/* Rating Filter */}
                <div>
                    <Label className="font-semibold">Rating</Label>
                     <RadioGroup
                        value={String(filters.rating)}
                        onValueChange={(value) => onFiltersChange({ ...filters, rating: Number(value) })}
                        className="mt-2 space-y-2"
                    >
                        {[4, 3, 2, 1].map(star => (
                             <div key={star} className="flex items-center">
                                <RadioGroupItem value={String(star)} id={`rating-${star}`} />
                                <Label htmlFor={`rating-${star}`} className="ml-2 flex items-center gap-2 cursor-pointer">
                                    <StarRating rating={star} />
                                    <span className="text-sm text-muted-foreground">& up</span>
                                </Label>
                             </div>
                        ))}
                    </RadioGroup>
                </div>
                <Separator />
                {/* Material Filter */}
                <div>
                    <Label className="font-semibold">Material</Label>
                    <div className="mt-2 space-y-2">
                        {allMaterials.map(material => (
                             <div key={material} className="flex items-center">
                                <Checkbox
                                    id={`material-${material}`}
                                    checked={filters.materials.includes(material)}
                                    onCheckedChange={() => handleMaterialChange(material)}
                                />
                                <Label htmlFor={`material-${material}`} className="ml-2 cursor-pointer">{material}</Label>
                             </div>
                        ))}
                    </div>
                </div>
                <Separator />
                {/* Color Filter */}
                <div>
                    <Label className="font-semibold">Color</Label>
                    <div className="mt-2 space-y-2">
                        {allColors.map(color => (
                             <div key={color} className="flex items-center">
                                <Checkbox
                                    id={`color-${color}`}
                                    checked={filters.colors.includes(color)}
                                    onCheckedChange={() => handleColorChange(color)}
                                />
                                <Label htmlFor={`color-${color}`} className="ml-2 cursor-pointer">{color}</Label>
                             </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}


export default function ProductFilters(props: ProductFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="md:hidden mb-4">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="py-4">
                <FilterContent {...props} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div className="hidden md:block">
        <FilterContent {...props} />
      </div>
    </>
  );
}
