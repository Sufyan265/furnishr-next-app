import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';
import { jsonStringify } from '@/lib/utils';
import { definePrompt } from 'genkit/prompt';
import { z } from 'zod';


export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.5-flash',
  prompt: {
    render: {
      template: {
        jsonStringify: (obj: any) => JSON.stringify(obj, null, 2),
      },
    }
  }
});
