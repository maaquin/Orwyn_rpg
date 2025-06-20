import dbConnect from '../../../lib/mongoose';
import GameSession from '../../../models/gameSession';

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;
  const playerId = id;

  if (req.method === 'GET') {
    try {
      const GameSession = await GameSession.findOne({ playerId });
      if (!GameSession) {
        return res.status(404).json({ message: 'Not found' });
      }
      res.status(200).json(GameSession);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error interno' });
    }
  } else if (req.method === 'POST') {
    try {
      const { currentText, options } = req.body;
      const updated = await GameSession.findOneAndUpdate(
        { playerId },
        { playerId, currentText, options, updatedAt: Date.now() },
        { upsert: true, new: true }
      );
      res.status(200).json(updated);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error' });
    }
  } else {
    res.status(405).json({ message: 'Wrong metod' });
  }
}
