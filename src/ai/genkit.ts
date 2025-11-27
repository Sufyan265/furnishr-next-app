import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.5-flash',
  prompt: {
    render: {
      template: {
        helpers: {
          jsonStringify: (obj: any) => JSON.stringify(obj, null, 2),
        }
      },
    }
  }
});
