import { connectToDB } from '@/lib/db'; // adjust path as per your project
import Mood from '@/models/Mood';

export async function POST(req) {
  const { mood } = await req.json();

  if (!mood) {
    return new Response(JSON.stringify({ error: 'Mood is required.' }), { status: 400 });
  }

  try {
    await connectToDB();
    const moodEntry = await Mood.create({ mood });

    return new Response(JSON.stringify({ success: true, mood: moodEntry }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}