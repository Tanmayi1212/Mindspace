'use client';

import { useState } from 'react';

const moodOptions = [
  { emoji: '😊', label: 'Happy' },
  { emoji: '😔', label: 'Sad' },
  { emoji: '😠', label: 'Frustrated' },
  { emoji: '😰', label: 'Anxious' },
  { emoji: '😩', label: 'Tired' },
  { emoji: '❤️', label: 'Grateful' },
];

export default function AnalyzePage() {
  const [messages, setMessages] = useState([
    {
      role: 'system',
      content:
        `You are a gentle, supportive mental health companion. 
Respond with 1–3 short, warm affirmations. Be empathetic, calming, and speak like a caring friend. 
Use the user's current mood to personalize your response if it's provided.`,
    },
  ]);

  const [input, setInput] = useState('');
  const [mood, setMood] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const moodMessage = mood ? `User's mood: ${mood.label} ${mood.emoji}` : '';
    const userMessage = moodMessage ? `${moodMessage}\n\n${input}` : input;

    const updatedMessages = [...messages, { role: 'user', content: userMessage }];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Unknown error');

      setMessages([...updatedMessages, { role: 'assistant', content: data.response }]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Reflective Journal</h1>

      {/* Mood Check-In */}
      <div style={styles.moodContainer}>
        <p style={styles.moodPrompt}>How are you feeling today?</p>
        <div style={styles.emojiRow}>
          {moodOptions.map((option) => (
            <button
              key={option.label}
              onClick={() => setMood(option)}
              style={{
                ...styles.emojiButton,
                backgroundColor: mood?.label === option.label ? '#d8f3dc' : '#fff',
              }}
            >
              <span style={{ fontSize: 24 }}>{option.emoji}</span>
            </button>
          ))}
        </div>
        {mood && (
          <p style={styles.selectedMood}>
            You selected: <strong>{mood.emoji} {mood.label}</strong>
          </p>
        )}
      </div>

      {/* Chat Display */}
      <div style={styles.chatBox}>
        {messages.slice(1).map((msg, index) => (
          <div
            key={index}
            style={{
              margin: '10px 0',
              textAlign: msg.role === 'user' ? 'right' : 'left',
            }}
          >
            <div
              style={{
                ...styles.messageBubble,
                backgroundColor: msg.role === 'user' ? '#d0f0c0' : '#f2f2f2',
              }}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && <p style={styles.typing}>✨ Listening with care...</p>}
      </div>

      {/* Input Box */}
      <textarea
        rows={3}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type how you're feeling..."
        style={styles.textarea}
      />

      <button onClick={sendMessage} disabled={loading || !input.trim()} style={styles.button}>
        {loading ? 'Sending...' : 'Send'}
      </button>

      {error && <div style={styles.error}>⚠️ {error}</div>}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 600,
    margin: '0 auto',
    padding: 20,
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#fdfcfb',
    color: '#333',
  },
  title: {
    textAlign: 'center',
    fontWeight: 600,
    fontSize: 24,
    marginBottom: 20,
    color: '#4b6650',
  },
  moodContainer: {
    textAlign: 'center',
    marginBottom: 20,
  },
  moodPrompt: {
    fontSize: 16,
    marginBottom: 10,
  },
  emojiRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: 10,
    flexWrap: 'wrap',
  },
  emojiButton: {
    border: '1px solid #ccc',
    borderRadius: '50%',
    padding: 10,
    cursor: 'pointer',
    width: 50,
    height: 50,
    backgroundColor: '#fff',
  },
  selectedMood: {
    marginTop: 10,
    color: '#555',
    fontSize: 14,
  },
  chatBox: {
    maxHeight: '50vh',
    overflowY: 'auto',
    padding: 10,
    border: '1px solid #ddd',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    marginBottom: 10,
  },
  messageBubble: {
    display: 'inline-block',
    padding: '10px 14px',
    borderRadius: 12,
    maxWidth: '75%',
    whiteSpace: 'pre-wrap',
    fontSize: 15,
    lineHeight: 1.4,
  },
  textarea: {
    width: '100%',
    padding: 12,
    fontSize: 15,
    borderRadius: 6,
    border: '1px solid #ccc',
    resize: 'none',
    marginBottom: 10,
  },
  button: {
    width: '100%',
    backgroundColor: '#6da77d',
    color: '#fff',
    padding: 12,
    border: 'none',
    borderRadius: 6,
    fontSize: 16,
    cursor: 'pointer',
  },
  typing: {
    color: '#888',
    fontStyle: 'italic',
    paddingLeft: 5,
  },
  error: {
    marginTop: 10,
    color: 'red',
    fontSize: 14,
  },
};
