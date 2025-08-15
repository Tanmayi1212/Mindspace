'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function EditEntry() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  const [entry, setEntry] = useState({ title: '', content: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Sentiment analysis state
  const [sentiment, setSentiment] = useState('');
  const [confidence, setConfidence] = useState(0);

  // Fetch the journal entry on load
  useEffect(() => {
    if (!id) return;

    const fetchEntry = async () => {
      try {
        const res = await fetch(`/api/journal/${id}`);
        if (!res.ok) throw new Error('Failed to fetch journal entry');
        const data = await res.json();
        setEntry({ title: data.title || '', content: data.content || '' });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEntry();
  }, [id]);

  // Automatically analyze sentiment after content is fetched
  useEffect(() => {
    if (entry.content) {
      analyzeSentiment(entry.content);
    }
  }, [entry.content]);

  // Function to call /api/analyze with text
  const analyzeSentiment = async (text) => {
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }), // ✅ Important: this must match API input
      });

      const data = await res.json();

      if (data.error) {
        console.error('Sentiment error:', data.error);
        return;
      }

      setSentiment(data.sentiment);
      setConfidence(data.confidence);
    } catch (err) {
      console.error('Sentiment analysis failed:', err);
    }
  };

  // Submit updated entry
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/journal/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry),
      });
      if (!res.ok) throw new Error('Failed to update journal entry');
      router.push('/journal');
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <p className="p-4">Loading entry...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Entry</h1>

      {/* Display sentiment if available */}
      {sentiment && (
        <div className="p-3 border rounded bg-purple-100 text-purple-800 mb-4">
          <strong>Sentiment:</strong> {sentiment} <br />
          <strong>Confidence:</strong> {(confidence * 100).toFixed(2)}%
        </div>
      )}

      <input
        value={entry.title}
        onChange={(e) => setEntry((prev) => ({ ...prev, title: e.target.value }))}
        placeholder="Title"
        className="block w-full mb-3 p-2 border rounded"
      />

      <textarea
        value={entry.content}
        onChange={(e) => setEntry((prev) => ({ ...prev, content: e.target.value }))}
        placeholder="Write your thoughts..."
        className="block w-full mb-3 p-2 border rounded h-40"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Changes
      </button>
    </form>
  );
}
