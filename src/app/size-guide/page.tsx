
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Ruler } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Size Guide | Furnishr',
  description: 'Find the perfect fit for your space with our comprehensive furniture size guide for beds and sofas.',
};

export default function SizeGuidePage() {
  return (
    <div className="bg-background">
      <section className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <Ruler className="h-12 w-12 mx-auto text-primary" />
          <h1 className="font-headline text-4xl md:text-5xl font-bold mt-4">Furniture Size Guide</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Ensure the perfect fit. Use our guide to find the right dimensions for your beds and sofas.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mt-16">
          <Tabs defaultValue="beds">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="beds">Beds & Mattresses</TabsTrigger>
              <TabsTrigger value="sofas">Sofas</TabsTrigger>
            </TabsList>
            <TabsContent value="beds">
              <h2 className="font-headline text-2xl font-bold my-6">Standard UK Bed & Mattress Sizes</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[150px]">Size</TableHead>
                    <TableHead>Dimensions (Width x Length)</TableHead>
                    <TableHead>Best For</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Single</TableCell>
                    <TableCell>90cm x 190cm (3'0" x 6'3")</TableCell>
                    <TableCell>Children, small bedrooms, guest rooms.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Double</TableCell>
                    <TableCell>135cm x 190cm (4'6" x 6'3")</TableCell>
                    <TableCell>The most common size for couples, fits most bedrooms.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">King</TableCell>
                    <TableCell>150cm x 200cm (5'0" x 6'6")</TableCell>
                    <TableCell>Couples who want extra room, taller individuals.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Super King</TableCell>
                    <TableCell>180cm x 200cm (6'0" x 6'6")</TableCell>
                    <TableCell>Ultimate luxury and space, ideal for large master bedrooms.</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <p className="text-sm text-muted-foreground mt-4">*Note: Bed frame dimensions will be slightly larger than mattress dimensions. Always check individual product pages for exact frame measurements.</p>
            </TabsContent>
            <TabsContent value="sofas">
               <h2 className="font-headline text-2xl font-bold my-6">Typical Sofa Sizes</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[150px]">Size</TableHead>
                    <TableHead>Typical Width</TableHead>
                    <TableHead>Best For</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                   <TableRow>
                    <TableCell className="font-medium">Armchair</TableCell>
                    <TableCell>80cm - 120cm</TableCell>
                    <TableCell>Reading nooks, complementing a larger sofa, small spaces.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">2 Seater</TableCell>
                    <TableCell>150cm - 200cm</TableCell>
                    <TableCell>Apartments, small living rooms, or as part of a larger suite.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">3 Seater</TableCell>
                    <TableCell>200cm - 230cm</TableCell>
                    <TableCell>The standard family sofa, comfortable for three adults.</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">4+ Seater / Corner</TableCell>
                    <TableCell>240cm+</TableCell>
                    <TableCell>Large living rooms, open-plan spaces, and entertaining guests.</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
               <p className="text-sm text-muted-foreground mt-4">*Note: Sofa dimensions, especially depth and height, vary greatly by style. Always check the specific measurements on the product page.</p>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
