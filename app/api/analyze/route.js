// app/api/analyze/route.js
import { CohereClient } from 'cohere-ai';

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY, // Ensure this is set in your .env.local
});

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body || !Array.isArray(body.messages) || body.messages.length === 0) {
      return new Response(JSON.stringify({ error: 'Invalid message format.' }), { status: 400 });
    }

    const messages = body.messages;

    const response = await cohere.chat({
      model: 'command-r-plus',
      temperature: 0.7,
      message: messages[messages.length - 1].content,
      messageHistory: messages.slice(0, -1).map((msg) => ({
        role: msg.role,
        message: msg.content,
      })),
    });

    const resultText =
      response.text || response.generations?.[0]?.text || '⚠️ No meaningful response generated.';

    return new Response(JSON.stringify({ response: resultText }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('[Analyze API Error]', error);
    return new Response(
      JSON.stringify({
        error: 'AI analysis failed.',
        details: error.message || 'Unknown error occurred.',
      }),
      { status: 500 }
    );
  }
}
