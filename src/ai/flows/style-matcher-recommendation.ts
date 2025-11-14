'use server';

/**
 * @fileOverview AI-powered furniture recommendation flow based on user-uploaded images.
 *
 * This flow takes an image of a living space and returns furniture recommendations that match the style.
 *
 * @exports {styleMatcherRecommendation} - The main function to trigger the recommendation flow.
 * @exports {StyleMatcherRecommendationInput} - The input type for the styleMatcherRecommendation function.
 * @exports {StyleMatcherRecommendationOutput} - The output type for the styleMatcherRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

/**
 * Input schema for the style matcher recommendation flow.
 */
const StyleMatcherRecommendationInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of the user's living space, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});

/**
 * Type definition for the input of the style matcher recommendation flow.
 */
export type StyleMatcherRecommendationInput = z.infer<typeof StyleMatcherRecommendationInputSchema>;

/**
 * Output schema for the style matcher recommendation flow.
 */
const StyleMatcherRecommendationOutputSchema = z.object({
  recommendations: z.array(
    z.object({
      furnitureItem: z.string().describe('Recommended furniture item.'),
      reason: z.string().describe('Reasoning for the recommendation based on the image.'),
    })
  ).describe('Array of furniture recommendations.'),
});

/**
 * Type definition for the output of the style matcher recommendation flow.
 */
export type StyleMatcherRecommendationOutput = z.infer<typeof StyleMatcherRecommendationOutputSchema>;

/**
 * Main function to trigger the style matcher recommendation flow.
 * @param {StyleMatcherRecommendationInput} input - The input containing the photo data URI.
 * @returns {Promise<StyleMatcherRecommendationOutput>} - A promise resolving to the furniture recommendations.
 */
export async function styleMatcherRecommendation(input: StyleMatcherRecommendationInput): Promise<StyleMatcherRecommendationOutput> {
  return styleMatcherRecommendationFlow(input);
}

/**
 * Prompt definition for the style matcher recommendation flow.
 */
const styleMatcherPrompt = ai.definePrompt({
  name: 'styleMatcherPrompt',
  input: {schema: StyleMatcherRecommendationInputSchema},
  output: {schema: StyleMatcherRecommendationOutputSchema},
  prompt: `You are an expert interior designer. Analyze the following image of a living space and provide furniture recommendations that match the style shown in the image.

Consider the colors, textures, and overall aesthetic of the space when making your recommendations. Provide a brief explanation for each recommendation.

Image: {{media url=photoDataUri}}

Recommendations:`,
});

/**
 * Flow definition for the style matcher recommendation.
 */
const styleMatcherRecommendationFlow = ai.defineFlow(
  {
    name: 'styleMatcherRecommendationFlow',
    inputSchema: StyleMatcherRecommendationInputSchema,
    outputSchema: StyleMatcherRecommendationOutputSchema,
  },
  async input => {
    const {output} = await styleMatcherPrompt(input);
    return output!;
  }
);
