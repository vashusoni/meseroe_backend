// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// ✅ 1. auth.routes.js को import करो
const authRoutes = require('./routes/auth.routes'); // ✔️ सही path दें

// ✅ 2. उसे base route पर use करो
app.use('/api/auth', authRoutes); // ✔️ अब route एक्टिव हो जाएगा

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Example test route
app.get('/', (req, res) => res.send('Foodstall API running'));

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
