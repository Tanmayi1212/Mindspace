// app/api/prompts/route.js
import { generatePrompt } from '@/utils/generatePrompts';

export async function POST(req) {
  const { mood } = await req.json();
  const prompts = await generatePrompt(mood);
  return Response.json({ prompts });
}
