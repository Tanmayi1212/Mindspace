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
        <div
          key={entry._id}
          style={{
            background: 'var(--bg-card)',
            color: 'var(--text-main)',
            padding: '1rem',
            borderRadius: '0.75rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            border: `1px solid var(--border-main)`,
            transition: 'background 0.3s, color 0.3s',
          }}
        >
          <h2 className="text-lg font-semibold">{entry.title}</h2>
          <p style={{ color: 'var(--text-main)' }}>{entry.content}</p>
          <a href={`/journal/${entry._id}/edit`} className="hover:underline text-blue-500 text-sm mr-4">Edit</a>
          <button
            onClick={() => handleDelete(entry._id)}
            className="text-red-500 hover:underline text-sm"
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
