import mongoose from 'mongoose';

const GameSessionSchema = new mongoose.Schema({
  playerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true },
  currentText: { type: String, default: "" },
  options: { type: [String], default: [] },
  updatedAt: { type: Date, default: Date.now }
});

// Actualiza `updatedAt` automáticamente cada vez que se guarda
GameSessionSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.models.GameSession || mongoose.model('GameSession', GameSessionSchema);