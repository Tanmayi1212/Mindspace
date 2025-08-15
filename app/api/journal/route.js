// app/api/journal/route.js
import { connectToDatabase } from '@/lib/mongodb';
import Journal from '@/models/Journal';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const { title, content, mood } = await req.json();
    await connectToDatabase();

    const newEntry = await Journal.create({
      title,
      content,
      mood,
      userId: session.user.email, // associate with logged-in user
    });

    return new Response(JSON.stringify(newEntry), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to save journal entry', details: err.message }), {
      status: 500,
    });
  }
}
