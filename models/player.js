import mongoose from 'mongoose';

const StatsSchema = new mongoose.Schema({
  attack: { type: Number, default: 0 },
  magic_attack: { type: Number, default: 0 },
  defense: { type: Number, default: 0 },
  magic_defense: { type: Number, default: 0 },
  speed: { type: Number, default: 0 },
  accuracy: { type: Number, default: 0 },
  health: { type: Number, default: 0 },
}, { _id: false });

const ParentSchema = new mongoose.Schema({
  name: { type: String, default: "" },
  profession: { type: String, default: "" },
}, { _id: false });

const ParentsSchema = new mongoose.Schema({
  father: { type: ParentSchema, default: () => ({}) },
  mother: { type: ParentSchema, default: () => ({}) }
}, { _id: false });

const PlayerDataSchema = new mongoose.Schema({
  hometown: { type: String, default: "" },
  money: { type: Number, default: 0 },
  status: { type: String, default: "" },
  nature: { type: String, default: "" },
  name: { type: String, default: "" },
  hp: { type: Number, default: 0 },
  parents: { type: ParentsSchema, default: () => ({}) },
  race: { type: String, default: "" },
  class: { type: String, default: "" },
  sex: { type: String, default: "" },
  stats: { type: StatsSchema, default: () => ({}) }
}, { _id: false });

const ItemSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, default: "misc" },
  quantity: { type: Number, default: 1 },
  efect: { type: Number, default: 1 }
}, { _id: false });

const PlayerSchema = new mongoose.Schema({
  location: {
    type: [Number],
    default: [0, 0],
    validate: arr => arr.length === 2
  },
  inventory: {
    type: [ItemSchema],
    default: []
  },
  history: {
    type: [String],
    default: []
  },
  playerData: {
    type: PlayerDataSchema,
    default: () => ({})
  }
});

if (mongoose.models.Player) {
  delete mongoose.models.Player;
}

export default mongoose.models.Player || mongoose.model('Player', PlayerSchema);