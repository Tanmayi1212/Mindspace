import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req) {
  const { email, name, theme } = await req.json();
  await connectToDatabase();
  const user = await User.findOne({ email });
  if (!user) {
    return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
  }
  user.name = name;
  user.theme = theme;
  await user.save();
  return new Response(JSON.stringify({ message: 'User updated' }), { status: 200 });
}
