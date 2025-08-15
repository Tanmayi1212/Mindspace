import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';
import { hash } from 'bcryptjs';

export async function POST(req) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return new Response(JSON.stringify({ error: 'Email and password are required.' }), { status: 400 });
  }

  await connectToDatabase();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return new Response(JSON.stringify({ error: 'User already exists.' }), { status: 400 });
  }

  const hashedPassword = await hash(password, 12);
  await User.create({ email, password: hashedPassword });

  return new Response(JSON.stringify({ message: 'User created successfully' }), { status: 201 });
}
