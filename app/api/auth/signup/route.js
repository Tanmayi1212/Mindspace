import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';
import { hash } from 'bcryptjs';

export async function POST(req) {
  try {
    const { email, password, name, theme } = await req.json();

    if (!email || !password || !name || !theme) {
      return new Response(JSON.stringify({ error: 'All fields are required.' }), { status: 400 });
    }

    await connectToDatabase();

    // Check for duplicate email or name
    const existingUser = await User.findOne({ $or: [{ email }, { name }] });
    if (existingUser) {
      return new Response(JSON.stringify({ error: 'User with this email or name already exists.' }), { status: 400 });
    }

    const hashedPassword = await hash(password, 12);
    await User.create({ email, password: hashedPassword, name, theme });

    return new Response(JSON.stringify({ message: 'User created successfully' }), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Signup failed. Please try again.' }), { status: 500 });
  }
}
