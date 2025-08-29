'use client';

import { useState, useEffect } from 'react';

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
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Check localStorage for theme first
    const getTheme = () => {
      if (typeof window === 'undefined') return 'light';
      return localStorage.getItem('theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    };
    setTheme(getTheme());

    // Listen for theme changes in localStorage (from settings page or elsewhere)
    const onStorage = (e) => {
      if (e.key === 'theme' && e.newValue) setTheme(e.newValue);
    };
    window.addEventListener('storage', onStorage);

    // Listen for system theme changes only if not set in localStorage
    let mq;
    if (!localStorage.getItem('theme')) {
      mq = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = (e) => setTheme(e.matches ? 'dark' : 'light');
      mq.addEventListener('change', handler);
      return () => {
        window.removeEventListener('storage', onStorage);
        mq.removeEventListener('change', handler);
      };
    }
    return () => window.removeEventListener('storage', onStorage);
  }, []);

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
    <div
      style={{
        ...styles.container,
        backgroundColor: theme === 'dark' ? '#23272f' : '#fdfcfb', // ensure correct color
        color: theme === 'dark' ? '#e6f4ea' : '#333',
      }}
    >
      {/* TEMPORARY MESSAGE FOR TESTING */}
      <div style={{ padding: 12, background: '#F6B93B', color: '#23272f', borderRadius: 8, marginBottom: 16, textAlign: 'center', fontWeight: 'bold' }}>
        TEMPORARY TEST MESSAGE: If you see this, your changes are working!
      </div>
      <h1 style={{ ...styles.title, color: theme === 'dark' ? '#f6b93b' : '#4b6650' }}>Reflective Journal</h1>
      {/* Mood Check-In */}
      <div style={styles.moodContainer}>
        <p style={{ ...styles.moodPrompt, color: theme === 'dark' ? '#f6b93b' : '#4b6650' }}>
          How are you feeling today?
        </p>
        <div style={styles.emojiRow}>
          {moodOptions.map((option) => (
            <button
              key={option.label}
              onClick={() => setMood(option)}
              style={{
                border: theme === 'dark' ? '1.5px solid #f6b93b' : '1.5px solid #F6B93B',
                borderRadius: '50%',
                padding: 10,
                cursor: 'pointer',
                width: 50,
                height: 50,
                backgroundColor:
                  theme === 'dark'
                    ? (mood?.label === option.label ? '#3B7A57' : '#23272f')
                    : (mood?.label === option.label ? '#F9D423' : '#F6B93B'),
                color: theme === 'dark' ? '#f6b93b' : '#fff',
                transition: 'background 0.2s, color 0.2s',
                boxShadow: mood?.label === option.label ? '0 0 0 2px #f6b93b' : 'none',
              }}
            >
              <span style={{ fontSize: 24 }}>{option.emoji}</span>
            </button>
          ))}
        </div>
        {mood && (
          <p style={{ ...styles.selectedMood, color: theme === 'dark' ? '#f6b93b' : '#555' }}>
            You selected: <strong>{mood.emoji} {mood.label}</strong>
          </p>
        )}
      </div>

      {/* Chat Display */}
      <div
        style={{
          ...styles.chatBox,
          backgroundColor: theme === 'dark' ? '#1a1d23' : '#ffffff',
          border: theme === 'dark' ? '1px solid #f6b93b' : '1px solid #ddd',
          color: theme === 'dark' ? '#e6f4ea' : '#333',
        }}
      >
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
        style={{
          ...styles.textarea,
          backgroundColor: theme === 'dark' ? '#1a1d23' : '#fff',
          color: theme === 'dark' ? '#e6f4ea' : '#333',
          border: theme === 'dark' ? '1px solid #f6b93b' : '1px solid #ccc',
        }}
      />

      <button
        onClick={sendMessage}
        disabled={loading || !input.trim()}
        style={{
          ...styles.button,
          backgroundColor: theme === 'dark' ? '#3B7A57' : '#6da77d',
          color: theme === 'dark' ? '#f6b93b' : '#fff',
        }}
      >
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
    color: '#4b6650',
  },
  emojiRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: 10,
    flexWrap: 'wrap',
  },
  emojiButton: {
    border: '1px solid #F6B93B',
    borderRadius: '50%',
    padding: 10,
    cursor: 'pointer',
    width: 50,
    height: 50,
    backgroundColor: '#F6B93B',
    color: '#fff',
    transition: 'background 0.2s, color 0.2s',
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
    color: '#333',
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
    backgroundColor: '#fff',
    color: '#333',
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