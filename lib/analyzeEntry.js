// lib/analyzeEntry.js
import { CohereClient } from 'cohere-ai';

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

export async function analyzeEntry(text) {
  const response = await cohere.classify({
    inputs: [text],
    examples: [
      { text: "I'm feeling so happy and full of life today!", label: "positive" },
      { text: "I’m really down. Nothing’s going right.", label: "negative" },
      { text: "Just another normal day, nothing special.", label: "neutral" }
    ],
  });

  const classification = response.classifications?.[0];

  return {
    sentiment: classification?.prediction || 'unknown',
    confidence: classification?.confidence || 0,
  };
}
