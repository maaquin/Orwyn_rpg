import dbConnect from '../../../lib/mongoose';
import Player from '../../../models/player';

function flattenObject(obj, prefix = '') {
  return Object.keys(obj).reduce((acc, key) => {
    const value = obj[key];
    const prefixedKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      Object.assign(acc, flattenObject(value, prefixedKey));
    } else {
      acc[prefixedKey] = value;
    }

    return acc;
  }, {});
}

export default async function handler(req, res) {
  await dbConnect();

  const { id } = req.query;

  if (!id) return;

  if (req.method === 'GET') {
    try {
      const player = await Player.findById(id);

      if (!player) {
        return res.status(404).json({ message: "Player not found" });
      }

      res.status(200).json(player);
    } catch (error) {
      console.error("Error finding player:", error);
      res.status(500).json({ message: "Error", error: error.message });
    }
  } else if (req.method === 'PUT') {
    try {
      const updates = flattenObject(req.body);

      const playerUpdated = await Player.findByIdAndUpdate(
        id,
        { $set: updates },
        { new: true }
      );

      if (!playerUpdated) return res.status(404).json({ message: "Player not Found" });

      res.status(200).json(playerUpdated);
    } catch (error) {
      console.error("Error updating player:", error);
      res.status(500).json({ message: "Error", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Wrong metod" });
  }
}