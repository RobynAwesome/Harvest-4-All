const express = require("express");
const router = express.Router();
const AfricasTalking = require("africastalking");
const DispatchLog = require("../models/DispatchLog");

// Initialization of Africa's Talking SDK
const credentials = {
  apiKey: process.env.AFRICASTALKING_API_KEY || "sandbox-key-placeholder", 
  username: process.env.AFRICASTALKING_USERNAME || "sandbox",
};

const AT = AfricasTalking(credentials);
const sms = AT.SMS;

// POST /api/messaging/send-tip
router.post("/send-tip", async (req, res) => {
  const { phone, category = "general" } = req.body;

  if (!phone) {
    return res.status(400).json({ error: "Phone number required" });
  }

  // Formatting South African numbers to international format (+27...)
  let formattedPhone = phone.trim();
  if (formattedPhone.startsWith("0") && formattedPhone.length === 10) {
    formattedPhone = "+27" + formattedPhone.slice(1);
  } else if (!formattedPhone.startsWith("+")) {
    formattedPhone = "+" + formattedPhone;
  }

  const tips = {
    general: "🌱 Welcome to Harvest For All! Reply GROW, WASTE, WATER or MARKET for tips.",
    grow: "🌱 Spinach grows in 4-6 weeks in 2L bottles. Start small! Reply GROW for more.",
    reduce: "♻️ Turn plastic bottles into planters. Log your waste today! Reply REDUCE for ideas.",
    save: "💧 5-min shower saves 400L/week. Use greywater for your garden. Reply SAVE for more.",
    market: "🛒 Sell your harvest locally! Post on our marketplace. Reply MARKET for link.",
  };

  const message = tips[category] || tips.general;
  const finalMessage = `${message}\n\nReply STOP to unsubscribe. HarvestForAll.co.za`;

  try {
    const result = await sms.send({
      to: [formattedPhone],
      message: finalMessage,
      enqueue: true,
    });

    if (result.SMSMessageData.Recipients[0].statusCode === 101) {
      // Persist to Dispatch Log
      try {
        await DispatchLog.create({
          phoneNumber: phone,
          type: "SMS",
          content: `Tip Stream: ${category.toUpperCase()}`,
        });
      } catch (logErr) {
        console.error("❌ Failed to log SMS dispatch:", logErr);
      }

      res.json({ success: true, message: "Tip sent successfully!" });
    } else {
      console.log("✅ SMS sent to:", formattedPhone, result);
      res.json({ success: true, message: "✅ Tip sent to your phone!", data: result });
    }
  } catch (error) {
    console.error("❌ SMS Error:", error);
    res.status(500).json({ error: "Failed to send SMS" });
  }
});

module.exports = router;
