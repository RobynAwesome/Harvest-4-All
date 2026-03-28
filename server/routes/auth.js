const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { db } = require("../localDb");
const { authMiddleware, JWT_SECRET } = require("../middleware/auth");

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id || user._id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, location } = req.body;

    const existingUser = db.get("users").find({ email }).value();
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Direct storage (for hackathon demo simplicity)
    const newUser = {
      id: "u-" + Date.now(),
      username,
      email,
      password: bcrypt.hashSync(password, 10),
      role: "user",
      location,
      points: 0,
      badges: []
    };

    db.get("users").push(newUser).write();

    const token = generateToken(newUser);
    res.status(201).json({
      token,
      user: { id: newUser.id, username: newUser.username, email: newUser.email, role: newUser.role, location: newUser.location },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = db.get("users").find({ email: email.toLowerCase() }).value();
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = bcrypt.compareSync(password, user.password || "");
    // Fallback for demo users with plain passwords
    const plainMatch = password === user.password;
    
    if (!isMatch && !plainMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user);
    res.json({
      token,
      user: { id: user.id, username: user.username, email: user.email, role: user.role, location: user.location },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/auth/demo-login (Insta-Login)
router.post("/demo-login", (req, res) => {
  const { userId } = req.body; // e.g., 'admin-kholofelo'
  const user = db.get("users").find({ id: userId }).value();
  
  if (!user) return res.status(404).json({ message: "Demo user not found" });

  const token = generateToken(user);
  res.json({
    token,
    user: { id: user.id, username: user.username, email: user.email, role: user.role, location: user.location },
  });
});

// GET /api/auth/users (for Demo Picker)
router.get("/users", (req, res) => {
  const users = db.get("users").value();
  res.json(users);
});

// GET /api/auth/me (protected)
router.get("/me", authMiddleware, (req, res) => {
  const user = db.get("users").find({ id: req.user.id }).value();
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
    location: user.location,
  });
});

module.exports = router;
