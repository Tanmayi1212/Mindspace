'use client';

import { useState } from 'react';

const moods = ['😄', '🙂', '😐', '😔', '😢'];

export default function MoodCheckin() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [status, setStatus] = useState('');

  const submitMood = async () => {
    if (!selectedMood) return;

    setStatus('Saving...');
    try {
      const res = await fetch('/api/mood', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood: selectedMood }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('Mood saved. 🌟');
        setTimeout(() => setStatus(''), 3000);
      } else {
        throw new Error(data.error || 'Something went wrong.');
      }
    } catch (err) {
      setStatus(`Error: ${err.message}`);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: 20 }}>
      <h2>How are you feeling today?</h2>
      <div style={{ fontSize: '2rem', margin: '1rem 0' }}>
        {moods.map((mood) => (
          <button
            key={mood}
            onClick={() => setSelectedMood(mood)}
            style={{
              margin: '0 5px',
              padding: '10px 15px',
              fontSize: '2rem',
              border: selectedMood === mood ? '2px solid #333' : '1px solid #ccc',
              borderRadius: 8,
              background: selectedMood === mood ? '#e0f7fa' : '#fff',
              cursor: 'pointer',
            }}
          >
            {mood}
          </button>
        ))}
      </div>
      <button onClick={submitMood} disabled={!selectedMood} style={{ marginTop: 10 }}>
        Submit Mood
      </button>
      {status && <p style={{ marginTop: 10 }}>{status}</p>}
    </div>
  );
}
