
'use server';
/**
 * @fileOverview A natural language search flow for finding products.
 *
 * - searchProducts: A function that takes a search query and returns relevant products.
 */

import { ai } from '@/ai/genkit';
import { products } from '@/lib/data';
import { ProductSearchInputSchema, type ProductSearchInput, type ProductSearchOutput } from '@/ai/schemas';
import { z } from 'zod';


const productCatalog = products.map(p => ({
  id: p.id,
  name: p.name,
  category: p.category,
  description: p.description,
  style: p.style,
  material: p.material,
}));


const searchPrompt = ai.definePrompt({
  name: 'productSearchPrompt',
  input: { schema: ProductSearchInputSchema },
  output: { schema: z.object({
    results: z.array(
      z.object({
        id: z.string().describe('The ID of the matching product.'),
        reason: z.string().describe('A brief explanation of why this product is a good match for the user\'s query.'),
      })
    ).describe('An array of products that match the search query.'),
  }) },
  prompt: `You are an expert e-commerce search assistant for a furniture store called Furnishr.
Your task is to help users find the perfect furniture based on their natural language query.

You have access to the following product catalog:
---
{{jsonStringify productCatalog}}
---

Analyze the user's query: "{{query}}"

- Identify key characteristics like furniture type (sofa, bed), desired style (modern, classic), size (small, large), material (velvet, leather), or other features (recliner, storage).
- Match these characteristics against the products in the catalog.
- Return a list of product IDs that are the best matches. For each match, provide a short, compelling reason why it fits the user's request.
- If there are no clear matches, return an empty array.
- Prioritize relevance. Only return products that are a strong match for the query.
- Do not invent products that are not in the catalog.`,
});

const searchFlow = ai.defineFlow(
  {
    name: 'searchFlow',
    inputSchema: ProductSearchInputSchema,
    outputSchema: z.object({
        results: z.array(
          z.object({
            id: z.string().describe('The ID of the matching product.'),
            reason: z.string().describe('A brief explanation of why this product is a good match for the user\'s query.'),
          })
        ).describe('An array of products that match the search query.'),
      }),
  },
  async (input) => {
    const { output } = await searchPrompt({
        ...input,
        // @ts-ignore
        productCatalog
    });
    
    if (!output) {
        return { results: [] };
    }

    return output;
  }
);


export async function searchProducts(input: ProductSearchInput): Promise<ProductSearchOutput> {
    return searchFlow(input);
}
