import dbConnect from '@/lib/mongoose';
import Player from '@/models/player';

export default async function handler(req, res) {
  console.log('✅ handler invoked');

  // Encabezados CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    console.log('⚙️ Handling CORS preflight');
    return res.status(200).end();
  }

  let db;
  try {
    console.log('🛠️ Connecting to DB...');
    db = await dbConnect();
    console.log('✅ DB connected');
  } catch (e) {
    console.error('❌ DB connection error:', e);
    return res.status(500).json({ message: 'DB connect error', detail: e.message });
  }

  console.log('📬 Method:', req.method);

  if (req.method !== 'POST') {
    console.warn('🚫 Wrong Method', req.method);
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: 'Wrong method' });
  }

  try {
    console.log('📥 Creating player with data:', req.body);
    const newPlayer = await Player.create(req.body);
    console.log('✅ Player created:', newPlayer._id);
    return res.status(201).json({ playerId: newPlayer._id });
  } catch (e) {
    console.error('❌ Create error:', e);
    return res.status(500).json({ message: 'Create error', detail: e.message });
  }
}