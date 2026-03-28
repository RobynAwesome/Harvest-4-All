const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const { initDb } = require("./localDb");

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Local JSON Database
initDb();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the React app (if building for production)
app.use(express.static(path.join(__dirname, "../client/dist")));

// Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Harvest For All API is running (Offline Mode)." });
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
  console.log(`🚀 Server is running on port ${PORT} (Database: Local JSON)`);
});
