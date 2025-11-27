'use server';
/**
 * @fileOverview A conversational chatbot flow for customer support.
 *
 * - chat: A function that takes a user's message and conversation history to generate a response.
 */

import { ai } from '@/ai/genkit';
import { products } from '@/lib/data';
import { ChatbotInputSchema, type ChatbotInput, type ChatbotOutput } from '@/ai/schemas';
import { z } from 'zod';

const productCatalog = products.map(p => ({
  id: p.id,
  name: p.name,
  category: p.category,
  description: p.description,
  price: p.price,
  style: p.style,
  material: p.material,
  stock: p.stock
}));

const chatPrompt = ai.definePrompt({
  name: 'chatbotPrompt',
  input: { schema: ChatbotInputSchema },
  output: { schema: z.object({ response: z.string().describe('The chatbot\'s response to the user.') }) },
  prompt: `You are a friendly and helpful customer service chatbot for an online furniture store called Furnishr.
Your name is "Furni".

Your goal is to assist users with their questions about products and help them navigate the store.
You have access to the store's product catalog.

Product Catalog:
---
{{jsonStringify productCatalog}}
---

Current Conversation History (for context):
---
{{#each history}}
- {{this.role}}: {{this.content}}
{{/each}}
---

User's latest message: "{{message}}"

Based on the conversation history and the user's latest message, provide a concise, friendly, and helpful response.
- If the user asks about a specific product, use the catalog to provide information.
- If a product is out of stock, inform the user and suggest similar items if possible.
- If the user asks a general question (e.g., "What kind of sofas do you have?"), summarize the relevant products from the catalog.
- If you don't know the answer, politely say so and suggest they contact customer support.
- Keep your answers brief and to the point.
- Your personality is warm, approachable, and slightly enthusiastic.`,
});

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatbotInputSchema,
    outputSchema: z.object({ response: z.string() }),
  },
  async (input) => {
    const { output } = await chatPrompt({
      ...input,
      // @ts-ignore
      productCatalog
    });
    
    if (!output) {
      return { response: "I'm sorry, I'm having a little trouble thinking right now. Please try again in a moment." };
    }

    return output;
  }
);


export async function chat(input: ChatbotInput): Promise<ChatbotOutput> {
    const result = await chatFlow(input);
    return { response: result.response };
}
