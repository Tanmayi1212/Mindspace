// app/journal/page.js
import { connectToDatabase } from '@/lib/mongodb';
import Journal from '@/models/Journal';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import JournalList from './JournalList';

export default async function JournalPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin');
  }

  await connectToDatabase();

  const entries = await Journal.find({ userId: session.user.email }).sort({ createdAt: -1 }).lean();

  const safeEntries = entries.map(entry => ({
    ...entry,
    _id: entry._id.toString(),
    createdAt: entry.createdAt?.toString() ?? '',
  }));

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-700">Your Journal</h1>
      <JournalList entries={safeEntries} />
    </div>
  );
}
