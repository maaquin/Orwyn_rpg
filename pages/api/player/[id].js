import dbConnect from '../../../lib/mongoose';
import Player from '../../../models/player';

export default async function handler(req, res) {
  await dbConnect();

  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const player = await Player.findById(id);

      if (!player) {
        return res.status(404).json({ message: "Jugador no encontrado" });
      }

      res.status(200).json(player);
    } catch (error) {
      console.error("Error al obtener jugador:", error);
      res.status(500).json({ message: "Error interno", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
}