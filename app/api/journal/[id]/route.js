import { connectToDatabase } from '@/lib/mongodb';
import Journal from '@/models/Journal';
import { NextResponse } from 'next/server';

// GET a single journal entry
export async function GET(request, { params }) {
  const { id } = params;
  await connectToDatabase();
  const entry = await Journal.findById(id);
  if (!entry) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(entry);
}

// UPDATE a journal entry
export async function PUT(request, { params }) {
  const { id } = params;
  const data = await request.json();
  await connectToDatabase();
  const updated = await Journal.findByIdAndUpdate(
    id,
    { title: data.title, content: data.content },
    { new: true }
  );
  return NextResponse.json(updated);
}

// DELETE a journal entry
export async function DELETE(request, { params }) {
  const { id } = params;
  await connectToDatabase();
  await Journal.findByIdAndDelete(id);
  return NextResponse.json({ message: 'Deleted' });
}
