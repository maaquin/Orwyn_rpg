import dbConnect from '../../../lib/mongoose';
import Player from '../../../models/player';

export default async function handler(req, res) {
    // Headers CORS siempre presentes
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

    // Manejar preflight CORS (muy importante)
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    console.log('create');
    await dbConnect();
    console.log("Método recibido:", req.method);

    if (req.method === 'POST') {
        try {
            const playerData = req.body;
            const newPlayer = await Player.create(playerData);
            res.status(201).json({ message: "Success", playerId: newPlayer._id });
        } catch (error) {
            console.error("Error al crear jugador:", error);
            res.status(500).json({ message: "Error", error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ message: "Wrong method" });
    }
}