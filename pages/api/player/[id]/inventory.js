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

  const { action, item, quantityChange } = body;

  if (!action || !item) {
    return res.status(400).json({ message: 'Faltan datos en el body (action o item)' });
  }

  try {
    let playerUpdated;

    if (action === 'add') {
      playerUpdated = await Player.findByIdAndUpdate(
        id,
        { $push: { inventory: item } },
        { new: true }
      );

    } else if (action === 'update-quantity') {

      const player = await Player.findById(id);
      if (!player) {
        return res.status(404).json({ message: 'Jugador no encontrado' });
      }

      const existingItem = player.inventory.find(i => i.id === item.id);

      if (!existingItem) {
        return res.status(400).json({ message: 'Item no encontrado en el inventario' });
      }

      const newQuantity = existingItem.quantity + quantityChange;

      if (newQuantity <= 0) {
        // Eliminar el item si la cantidad es 0 o menor
        player.inventory = player.inventory.filter(i => i.id !== item.id);
      } else {
        // Actualizar la cantidad
        player.inventory = player.inventory.map(i =>
          i.id === item.id ? { ...i.toObject(), quantity: newQuantity } : i
        );
      }

      playerUpdated = await player.save();

    } else {
      return res.status(400).json({ message: 'Acción no reconocida' });
    }

    if (!playerUpdated) {
      return res.status(404).json({ message: 'Jugador no encontrado o no actualizado' });
    }

    res.status(200).json(playerUpdated);

  } catch (error) {
    console.error('Error en inventory:', error);
    res.status(500).json({ message: 'Error interno', error: error.message });
  }
}