'use client';

import { useState, useEffect } from 'react';

const MOOD_OPTIONS = [
  { emoji: '😄', label: 'Happy' },
  { emoji: '😐', label: 'Neutral' },
  { emoji: '😢', label: 'Sad' },
  { emoji: '😡', label: 'Frustrated' },
  { emoji: '😴', label: 'Tired' },
];

export default function MoodCheckIn() {
  const [mood, setMood] = useState(null);
  const [saveConsent, setSaveConsent] = useState(false);
  const [logSaved, setLogSaved] = useState(false);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('moodLogs') || '[]');
    setLogs(saved);
  }, []);

  const handleMoodSelect = (selectedMood) => {
    setMood(selectedMood);
    setLogSaved(false);
  };

  const saveMood = () => {
    const entry = {
      mood,
      timestamp: new Date().toISOString(),
    };
    const updatedLogs = [...logs, entry];
    localStorage.setItem('moodLogs', JSON.stringify(updatedLogs));
    setLogs(updatedLogs);
    setLogSaved(true);
  };

  const affirmations = {
    Happy: "I'm glad you're feeling good today! Keep doing what makes your heart light.",
    Neutral: "Even neutral days are part of your journey. Be kind to yourself.",
    Sad: "It’s okay to feel sad. This feeling won’t last forever. You are not alone.",
    Frustrated: "Frustration means you care. Take a breath — you’ve overcome hard things before.",
    Tired: "Rest is not laziness. You deserve to pause and recharge.",
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🧘 Mood Check-In</h1>
      <p style={styles.subtext}>How are you feeling right now?</p>

      <div style={styles.emojiRow}>
        {MOOD_OPTIONS.map((option) => (
          <button
            key={option.label}
            style={{
              ...styles.emojiButton,
              backgroundColor: mood === option.label ? '#e0f7fa' : '#fff',
            }}
            onClick={() => handleMoodSelect(option.label)}
          >
            <span style={{ fontSize: 28 }}>{option.emoji}</span>
          </button>
        ))}
      </div>

      {mood && (
        <div style={styles.resultBox}>
          <h3>{mood} — {affirmations[mood]}</h3>
          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={saveConsent}
              onChange={(e) => setSaveConsent(e.target.checked)}
            />
            Save this mood check-in
          </label>

          <button
            onClick={saveConsent ? saveMood : () => setLogSaved(true)}
            style={styles.logButton}
          >
            {saveConsent ? 'Save Mood' : 'Continue without Saving'}
          </button>

          {logSaved && (
            <p style={{ marginTop: 10, color: '#388e3c' }}>
              {saveConsent ? 'Mood saved successfully 💾' : 'Not saved — just checking in 💬'}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 600,
    margin: '40px auto',
    padding: 20,
    borderRadius: 10,
    background: '#f9fdfc',
    boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '1.8em',
    textAlign: 'center',
    color: '#1976d2',
  },
  subtext: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: '1em',
  },
  emojiRow: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  emojiButton: {
    padding: 10,
    borderRadius: 10,
    border: '1px solid #ccc',
    cursor: 'pointer',
    width: 60,
    height: 60,
    background: '#fff',
    transition: 'background 0.2s',
  },
  resultBox: {
    marginTop: 20,
    background: '#e3f2fd',
    padding: 15,
    borderRadius: 8,
  },
  checkboxLabel: {
    display: 'block',
    marginTop: 10,
    fontSize: 14,
  },
  logButton: {
    marginTop: 10,
    padding: '8px 14px',
    borderRadius: 6,
    backgroundColor: '#1976d2',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
};
