const mongoose = require("mongoose");

const growSchema = new mongoose.Schema({
  crop: {
    type: String,
    required: true,
  },
  season: {
    type: String,
    enum: ["spring", "summer", "autumn", "winter"],
  },
  location: String,
  startDate: Date,
  expectedHarvest: Date,
  status: {
    type: String,
    enum: ["planning", "planted", "growing", "harvested"],
    default: "planning",
  },
  notes: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Grow", growSchema);
