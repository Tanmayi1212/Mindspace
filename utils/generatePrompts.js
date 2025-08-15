const generatePrompt = async (mood = 'anxious') => {
  const res = await cohere.generate({
    model: 'command-xlarge-nightly',
    prompt: `Suggest 3 journaling prompts for someone feeling "${mood}" to help them reflect and feel better.`,
    max_tokens: 100,
    temperature: 0.8,
  });

  return res.body.generations[0].text.trim().split('\n').filter(Boolean);
};
