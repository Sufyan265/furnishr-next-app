import { z } from 'zod';

export const ProductSearchInputSchema = z.object({
    query: z.string().describe('The user\'s natural language search query.'),
});
export type ProductSearchInput = z.infer<typeof ProductSearchInputSchema>;

export const ProductSearchOutputSchema = z.object({
    results: z.array(
        z.object({
            id: z.string().describe('The ID of the matching product.'),
            reason: z.string().describe('A brief explanation of why this product is a good match for the user\'s query.'),
        })
    ).describe('An array of products that match the search query.'),
});
export type ProductSearchOutput = z.infer<typeof ProductSearchOutputSchema>;
