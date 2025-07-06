import dbConnect from '@/lib/mongoose';
import Player from '@/models/player';

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === 'POST') {
        try {
            const playerData = req.body;

            const newPlayer = await Player.create(playerData);

            res.status(201).json({ message: "Succes", playerId: newPlayer._id });
        } catch (error) {
            if (error.name === 'ValidationError') {
                console.error("Detalles de validación:");
                for (const field in error.errors) {
                    console.error(`- ${field}: ${error.errors[field].message}`);
                }
            } else {
                console.error("Error general:", error);
            }

            res.status(500).json({ message: "Error", error: error.message });
        }
    } else {
        res.status(405).json({ message: "Wrong metod" });
    }
}