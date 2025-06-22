import mongoose from 'mongoose';

const OptionsSchema = new mongoose.Schema({
  message: { type: String, default: '' },
  key: { type: String, default: '' },
}, { _id: false });

const GameSessionSchema = new mongoose.Schema({
  playerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true },
  currentText: { type: String, default: "" },
  options: { type: [OptionsSchema], default: [] },
  updatedAt: { type: Date, default: Date.now }
});

if (mongoose.models.Player) {
  delete mongoose.models.Player;
}

// Actualiza `updatedAt` automáticamente cada vez que se guarda
GameSessionSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.models.GameSession || mongoose.model('GameSession', GameSessionSchema);