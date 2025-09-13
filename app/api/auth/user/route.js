import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req) {
  const { email } = await req.json();
  await connectToDatabase();
  const user = await User.findOne({ email });
  if (!user) {
    return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
  }
  return new Response(JSON.stringify({
    name: user.name,
    email: user.email,
    theme: user.theme,
  }), { status: 200 });
}
