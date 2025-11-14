import { products, categories } from '@/lib/data';
import ProductCard from '@/components/product-card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';

export default function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const selectedCategory = searchParams.category as string | undefined;

  const filteredProducts = selectedCategory
    ? products.filter(p => p.categorySlug === selectedCategory)
    : products;

  const styles = [...new Set(products.map(p => p.style))];
  const materials = [...new Set(products.map(p => p.material))];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">
          {selectedCategory
            ? categories.find(c => c.slug === selectedCategory)?.name
            : 'All Products'}
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Discover our curated collection of fine furniture.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
        {/* Filters Sidebar */}
        <aside className="w-full md:w-1/4 lg:w-1/5">
          <div className="sticky top-20">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-headline text-2xl font-semibold">Filters</h2>
              <Link href="/products" className="text-sm text-muted-foreground hover:text-primary">Clear all</Link>
            </div>
            <Separator />
            
            <div className="py-6">
              <h3 className="font-semibold mb-3">Category</h3>
              <div className="space-y-2">
                {categories.map(category => (
                   <Link key={category.id} href={`/products?category=${category.slug}`} className={`block text-sm hover:text-primary ${selectedCategory === category.slug ? 'text-primary font-bold' : 'text-muted-foreground'}`}>{category.name}</Link>
                ))}
              </div>
            </div>
            <Separator />

            <div className="py-6">
              <h3 className="font-semibold mb-3">Price Range</h3>
              <Slider defaultValue={[500]} max={2000} step={50} />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>£0</span>
                <span>£2000</span>
              </div>
            </div>
            <Separator />

            <div className="py-6">
              <h3 className="font-semibold mb-3">Style</h3>
              <div className="space-y-2">
                {styles.map(style => (
                  <div key={style} className="flex items-center space-x-2">
                    <Checkbox id={`style-${style}`} />
                    <label htmlFor={`style-${style}`} className="text-sm text-muted-foreground">{style}</label>
                  </div>
                ))}
              </div>
            </div>
            <Separator />
            
            <div className="py-6">
              <h3 className="font-semibold mb-3">Material</h3>
              <div className="space-y-2">
                {materials.map(material => (
                  <div key={material} className="flex items-center space-x-2">
                    <Checkbox id={`material-${material}`} />
                    <label htmlFor={`material-${material}`} className="text-sm text-muted-foreground">{material}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <main className="w-full md:w-3/4 lg:w-4/5">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
            <p className="text-muted-foreground text-sm">{filteredProducts.length} products</p>
            <Select>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
