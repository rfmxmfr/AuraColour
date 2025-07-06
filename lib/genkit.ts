import { configureGenkit } from '@genkit-ai/core'
import { googleAI } from '@genkit-ai/googleai'

export const ai = configureGenkit({
  plugins: [
    googleAI({
      apiKey: process.env.GOOGLE_AI_API_KEY,
    }),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
})

export { generate } from '@genkit-ai/ai'
export { gemini15Flash, gemini15Pro } from '@genkit-ai/googleai'