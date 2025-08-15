'use client';
import { useRouter } from 'next/navigation';

export default function JournalList({ entries }) {
  const router = useRouter();

  const handleDelete = async (id) => {
    const confirmed = confirm('Are you sure you want to delete this entry?');
    if (!confirmed) return;

    await fetch(`/api/journal/${id}`, { method: 'DELETE' });
    router.refresh(); // reload data
  };

  return (
    <div className="space-y-4">
      {entries.map(entry => (
        <div key={entry._id} className="bg-white p-4 rounded shadow-sm border">
          <h2 className="text-lg font-semibold">{entry.title}</h2>
          <p className="text-gray-600">{entry.content}</p>
          <div className="mt-2 flex gap-4 text-sm text-blue-500">
            <a href={`/journal/${entry._id}/edit`} className="hover:underline">Edit</a>
            <button onClick={() => handleDelete(entry._id)} className="text-red-500 hover:underline">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
