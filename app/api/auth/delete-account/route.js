import { getServerSession } from 'next-auth/next';
import { authOptions } from '../[...nextauth]/route';
import User from '@/models/User';
import { connectToDatabase } from '@/lib/mongodb';

export async function DELETE(req) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }
  await connectToDatabase();
  await User.deleteOne({ email: session.user.email });
  return new Response(JSON.stringify({ message: 'Account deleted' }), { status: 200 });
}
