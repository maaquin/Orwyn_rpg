// pages/api/llm.js
import OpenAI from 'openai';

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    'HTTP-Referer': 'http://localhost:3000',
    'X-Title': 'Orwyn-game',
  },
});

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { messages } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: 'deepseek/deepseek-r1-0528-qwen3-8b:free',
      messages,
    });

    res.status(200).json({ result: completion.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: 'Error al comunicarse con el LLM' });
  }
}