'use client';

import { useState } from 'react';
import { analyzeEntry } from '@/lib/analyzeEntry';
import { analyzeWithCohere } from '@/utils/analyzeWithCohere';

export default function AnalyzePage() {
  const [entry, setEntry] = useState('');
  const [sentiment, setSentiment] = useState(null);
  const [aiReflection, setAiReflection] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!entry.trim()) return;
    setLoading(true);

    try {
      const sentimentResult = await analyzeEntry(entry);
      setSentiment(sentimentResult);

      const reflection = await analyzeWithCohere(entry);
      setAiReflection(reflection);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🧠 AI Journal Analyzer</h1>

      <textarea
        className="w-full p-3 border rounded mb-4"
        rows="6"
        placeholder="Paste your journal entry here..."
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
      />

      <button
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        onClick={handleAnalyze}
        disabled={loading}
      >
        {loading ? 'Analyzing...' : 'Analyze Entry'}
      </button>

      {sentiment && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold">📊 Sentiment</h2>
          <p>
            <strong>{sentiment.sentiment}</strong> ({(sentiment.confidence * 100).toFixed(1)}% confident)
          </p>
        </div>
      )}

      {aiReflection && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold">💬 AI Reflection</h2>
          <p className="whitespace-pre-line">{aiReflection}</p>
        </div>
      )}
    </div>
  );
}
