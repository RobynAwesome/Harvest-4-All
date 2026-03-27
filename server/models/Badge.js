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
  criteria: {
    actionType: {
      type: String,
      required: true,
      enum: ["grow", "save", "reduce", "impact"],
    },
    threshold: {
      type: Number,
      required: true,
      default: 1,
    },
    unit: String, // e.g., 'plants', 'liters', 'kg'
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
