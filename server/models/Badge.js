const mongoose = require("mongoose");

const badgeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: "🏆",
  },
  requirement: {
    type: {
      type: String,
      required: true,
      enum: ["grow", "save", "reduce", "impact", "harvest", "save_energy", "market", "water_saved", "energy_saved", "waste_reduced", "any", "points"],
    },
    count: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  points: {
    type: Number,
    default: 10,
  },
  rarity: {
    type: String,
    enum: ["common", "rare", "epic", "legendary"],
    default: "common",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Badge", badgeSchema);
