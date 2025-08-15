'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const moodOptions = ['😊', '😢', '😡', '😴', '😐'];

export default function NewEntryForm() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const res = await fetch('/api/journal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, mood }),
    });

    if (res.ok) {
      router.push('/journal');
    } else {
      const error = await res.json();
      alert(error.error || 'Something went wrong');
    }

    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-semibold">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block font-semibold">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows="6"
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Mood</label>
        <div className="flex space-x-2">
          {moodOptions.map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={() => setMood(emoji)}
              className={`text-2xl p-2 rounded ${
                mood === emoji ? 'bg-blue-200' : 'bg-gray-100'
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        {submitting ? 'Saving...' : 'Save Entry'}
      </button>
    </form>
  );
}
