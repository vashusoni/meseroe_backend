// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// ✅ 1. Routes import करो
const authRoutes = require('./routes/auth.routes');
const stallRoutes = require('./routes/stallAccount.routes'); // 

// ✅ 2. Use routes with base paths
app.use('/api/auth', authRoutes);
app.use('/api/stall', stallRoutes); 

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Example test route
app.get('/', (req, res) => res.send('Foodstall API running'));

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
