import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';
import { hash } from 'bcryptjs';

export async function POST(req) {
  const { token, password } = await req.json();
  await connectToDatabase();
  const user = await User.findOne({ resetToken: token });
  if (!user || !user.resetTokenExpiry || user.resetTokenExpiry < Date.now()) {
    return new Response(JSON.stringify({ error: 'Invalid or expired token' }), { status: 400 });
  }
  user.password = await hash(password, 12);
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;
  await user.save();
  return new Response(JSON.stringify({ message: 'Password updated' }), { status: 200 });
}
  return new Response(JSON.stringify({ message: 'Password updated' }), { status: 200 });
}
