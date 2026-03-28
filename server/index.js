const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the React app (if building for production)
app.use(express.static(path.join(__dirname, "../client/dist")));

// MongoDB Connection
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/harvest4all";
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
    console.log("⚠️  Server will run but API calls requiring DB will fail.");
  });

// Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Harvest For All API is running." });
});

// Auth Routes
app.use("/api/auth", require("./routes/auth"));

// Impact Routes
app.use("/api/impact", require("./routes/impact"));

// Grow Routes
app.use("/api/grow", require("./routes/grow"));

// Market Routes
app.use("/api/market", require("./routes/market"));

// Actions Routes
app.use("/api/actions", require("./routes/actions"));

// Messaging Routes
app.use("/api/messaging", require("./routes/messaging"));

// USSD Routes (Interactive Menu)
app.use("/api/ussd", require("./routes/ussd"));

// Handle SPA routing
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
