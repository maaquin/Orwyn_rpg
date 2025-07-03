import dbConnect from '../../../../lib/mongoose';
import Player from '../../../../models/player';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
    body,
  } = req;

  await dbConnect();

  if (method !== 'PUT') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  const { action, item } = body;

  if (!action || !item) {
    return res.status(400).json({ message: 'Faltan datos en el body (action o item)' });
  }

  try {
    let updateOp = {};

    if (action === 'add') {
      updateOp = { $push: { inventory: item } };
    } else if (action === 'remove') {
      updateOp = { $pull: { inventory: item } };
    } else {
      return res.status(400).json({ message: 'Acción no reconocida' });
    }

    const playerUpdated = await Player.findByIdAndUpdate(id, updateOp, { new: true });

    if (!playerUpdated) {
      return res.status(404).json({ message: 'Jugador no encontrado' });
    }

    res.status(200).json(playerUpdated);
  } catch (error) {
    console.error('Error en inventory:', error);
    res.status(500).json({ message: 'Error interno', error: error.message });
  }
}