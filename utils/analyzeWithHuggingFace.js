const analyzeWithHuggingFace = async (text) => {
  const res = await fetch(
    'https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-emotion',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: text }),
    }
  );

  const data = await res.json();
  return data[0]; // array of emotion probabilities
};
