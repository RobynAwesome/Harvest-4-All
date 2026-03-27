const mongoose = require("mongoose");

const actionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ["grow", "save", "reduce", "impact"],
  },
  description: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  unit: String,
  location: String,
  notes: String,
  points: {
    type: Number,
    default: 5,
  },
  badgesEarned: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Badge",
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
  // For future user system
  userId: {
    type: String,
    default: "anonymous",
  },
});

module.exports = mongoose.model("Action", actionSchema);
