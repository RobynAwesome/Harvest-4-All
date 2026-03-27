const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/harvest4all';
mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Routes
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Harvest For All API is running.' });
});

// Impact Routes
app.use('/api/impact', require('./routes/impact'));

// Market Routes
app.use('/api/market', require('./routes/market'));

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
