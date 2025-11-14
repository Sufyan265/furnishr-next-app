'use server';
/**
 * @fileOverview An AI-powered chatbot flow for answering product-related questions.
 *
 * @exports {productQuery} - The main function to handle a user's product query.
 * @exports {ProductQueryInput} - The input type for the productQuery function.
 * @exports {ProductQueryOutput} - The output type for the productQuery function.
 */

import { ai } from '@/ai/genkit';
import { products } from '@/lib/data';
import { z } from 'genkit';

/**
 * Input schema for the product query flow.
 */
const ProductQueryInputSchema = z.object({
  question: z.string().describe("The user's question about the furniture products."),
});

/**
 * Type definition for the input of the product query flow.
 */
export type ProductQueryInput = z.infer<typeof ProductQueryInputSchema>;

/**
 * Output schema for the product query flow.
 */
const ProductQueryOutputSchema = z.object({
  answer: z.string().describe("The AI's answer to the user's question."),
});

/**
 * Type definition for the output of the product query flow.
 */
export type ProductQueryOutput = z.infer<typeof ProductQueryOutputSchema>;

/**
 * Main function to trigger the product query flow.
 * @param {ProductQueryInput} input - The input containing the user's question.
 * @returns {Promise<ProductQueryOutput>} - A promise resolving to the AI's answer.
 */
export async function productQuery(input: ProductQueryInput): Promise<ProductQueryOutput> {
  return productQueryFlow(input);
}

const productCatalog = JSON.stringify(
    products.map(p => ({
        name: p.name,
        category: p.category,
        price: p.price,
        description: p.description,
        style: p.style,
        material: p.material,
        stock: p.stock
    }))
);

/**
 * Prompt definition for the product query flow.
 */
const productQueryPrompt = ai.definePrompt({
  name: 'productQueryPrompt',
  input: { schema: ProductQueryInputSchema },
  output: { schema: ProductQueryOutputSchema },
  prompt: `You are a friendly and helpful customer service assistant for an online furniture store called Furnishr. Your goal is to answer user questions about the products.

You have access to the store's product catalog. Use this information to answer the user's question accurately. Be concise and friendly in your response. If you don't know the answer, say that you can't find that information right now.

Here is the product catalog:
${productCatalog}

User's question: {{{question}}}

Answer:`,
});

/**
 * Flow definition for the product query.
 */
const productQueryFlow = ai.defineFlow(
  {
    name: 'productQueryFlow',
    inputSchema: ProductQueryInputSchema,
    outputSchema: ProductQueryOutputSchema,
  },
  async (input) => {
    const { output } = await productQueryPrompt(input);
    return output!;
  }
);
