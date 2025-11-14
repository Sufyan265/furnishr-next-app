'use client';

import { useState } from 'react';
import Image from 'next/image';
import { UploadCloud, Loader2, Wand2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import {
  styleMatcherRecommendation,
  StyleMatcherRecommendationInput,
  StyleMatcherRecommendationOutput,
} from '@/ai/flows/style-matcher-recommendation';
import Link from 'next/link';

export default function StyleMatcherPage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<StyleMatcherRecommendationOutput['recommendations'] | null>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Please upload an image smaller than 5MB.",
        });
        return;
      }
      setFile(selectedFile);
      setRecommendations(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleRemoveImage = () => {
    setFile(null);
    setPreviewUrl(null);
    setRecommendations(null);
    const fileInput = document.getElementById('photo-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file || !previewUrl) {
      toast({
        variant: "destructive",
        title: "No image selected",
        description: "Please upload an image of your room first.",
      });
      return;
    }

    setIsLoading(true);
    setRecommendations(null);

    try {
      const input: StyleMatcherRecommendationInput = {
        photoDataUri: previewUrl,
      };
      const result = await styleMatcherRecommendation(input);
      setRecommendations(result.recommendations);
    } catch (error) {
      console.error('Style Matcher Error:', error);
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: "Could not get recommendations. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-secondary/30 min-h-screen">
      <section className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <Wand2 className="h-12 w-12 mx-auto text-primary" />
          <h1 className="mt-4 font-headline text-4xl md:text-5xl font-bold">AI Style Matcher</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Stuck for ideas? Upload a photo of your space and let our AI interior designer give you personalized furniture recommendations.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto mt-12 shadow-lg">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {!previewUrl ? (
                <div className="flex items-center justify-center w-full">
                  <label htmlFor="photo-upload" className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-muted transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
                      <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                      <p className="text-xs text-muted-foreground">PNG, JPG, or WEBP (MAX. 5MB)</p>
                    </div>
                    <Input id="photo-upload" type="file" className="hidden" onChange={handleFileChange} accept="image/png, image/jpeg, image/webp" />
                  </label>
                </div>
              ) : (
                <div className="space-y-4">
                   <div className="relative w-full aspect-video rounded-lg overflow-hidden border">
                     <Image src={previewUrl} alt="Your room preview" fill className="object-contain" />
                   </div>
                   <div className="flex justify-center">
                      <Button type="button" variant="outline" onClick={handleRemoveImage}>
                        Choose a different image
                      </Button>
                   </div>
                </div>
              )}

              <Button type="submit" size="lg" className="w-full font-bold" disabled={!file || isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Analyzing your style...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-5 w-5" />
                    Get Recommendations
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <div className="max-w-4xl mx-auto mt-16">
            {isLoading && (
            <div className="text-center space-y-4 fade-in">
                <Loader2 className="h-10 w-10 mx-auto animate-spin text-primary" />
                <p className="text-muted-foreground">Our AI is having a look... This might take a moment.</p>
            </div>
            )}

            {recommendations && (
            <div className="fade-in">
                <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-10">Inspired by Your Space</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recommendations.map((rec, index) => (
                    <Card key={index} className="flex flex-col overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                    <CardHeader>
                        <CardTitle className="font-headline text-xl">{rec.furnitureItem}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <p className="text-muted-foreground">{rec.reason}</p>
                    </CardContent>
                    <CardContent>
                        <Button asChild className="w-full">
                        <Link href="/products">Explore Similar Items <ArrowRight className="ml-2 h-4 w-4" /></Link>
                        </Button>
                    </CardContent>
                    </Card>
                ))}
                </div>
                <div className="text-center mt-12">
                <p className="text-muted-foreground">These are AI-generated suggestions. <Link href="/products" className="text-primary hover:underline">Browse our full collection</Link> to find your perfect match.</p>
                </div>
            </div>
            )}
        </div>
      </section>
    </div>
  );
}
