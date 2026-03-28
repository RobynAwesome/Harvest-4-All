const express = require("express");
const router = express.Router();

// Localization: Sustainability Tips for Western Cape Townships
const tips = {
  grow: "🌱 GROW TIPS\n• Spinach: 4-6 weeks in 2L bottles\n• Kale: Nutrient powerhouse\n• Tomatoes: Container friendly\nReply 11 for full guide",
  reduce: "♻️ WASTE & RECYCLING\n• Bottles → Planters\n• Tyres → Raised beds\n• Log your waste today!\nReply 21 for DIY ideas",
  save: "💧 WATER & ENERGY\n• 5-min shower = 400L saved\n• Use greywater for garden\n• Eskom tip: Switch off geyser at night\nReply 31 for more",
  market: "🛒 LOCAL MARKETPLACE\n• Sell your harvest\n• Buy affordable seedlings\n• Post your produce now!\nReply 41 to post",
  impact: "⭐ MY IMPACT\n• Track meals grown\n• Water & Rands saved\n• View your dashboard online\nReply 51 for stats",
};

const DispatchLog = require("../models/DispatchLog");

// POST /api/ussd
router.post("/", async (req, res) => {
  console.log("📶 USSD Request Received:", req.body);
  const { sessionId, serviceCode, phoneNumber, text = "" } = req.body || {};

  // Persist session to Dispatch Log
  try {
    await DispatchLog.create({
      phoneNumber,
      type: "USSD",
      content: text === "" ? "Main Menu Access" : `Choice: ${text}`,
    });
  } catch (err) {
    console.error("❌ Failed to log USSD session:", err);
  }

  let response = "";

  if (text === "") {
    // MAIN MENU: Using Africa's Talking 'CON' (Continue) prefix
    response = `CON Welcome to Harvest For All 🌱\n\n1. Grow Tips\n2. Waste & Recycling\n3. Save Water & Energy\n4. Local Marketplace\n5. My Impact\n\nReply with number`;
  } else if (text === "1") {
    response = `CON ${tips.grow}\n\n0. Back to Menu`;
  } else if (text === "2") {
    response = `CON ${tips.reduce}\n\n0. Back to Menu`;
  } else if (text === "3") {
    response = `CON ${tips.save}\n\n0. Back to Menu`;
  } else if (text === "4") {
    response = `CON ${tips.market}\n\n0. Back to Menu`;
  } else if (text === "5") {
    response = `CON ${tips.impact}\n\n0. Back to Menu`;
  } else if (text === "0") {
    response = `CON Welcome back!\n\n1. Grow Tips\n2. Waste & Recycling\n3. Save Water & Energy\n4. Local Marketplace\n5. My Impact`;
  } else if (
    text.startsWith("1") ||
    text.startsWith("2") ||
    text.startsWith("3") ||
    text.startsWith("4") ||
    text.startsWith("5")
  ) {
    // Simple deep-level handling placeholder
    response = `CON Deep-dive tips coming soon!\n\n0. Back to Menu`;
  } else {
    // Finalizing session with 'END' prefix
    response = `END Invalid choice. High-five for supporting sustainability! 🌍`;
  }

  // Africa's Talking requires text/plain for USSD
  res.set("Content-Type", "text/plain");
  res.send(response);
});

module.exports = router;
