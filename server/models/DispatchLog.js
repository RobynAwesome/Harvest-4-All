const mongoose = require("mongoose");

const DispatchLogSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["SMS", "USSD"],
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  success: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("DispatchLog", DispatchLogSchema);
