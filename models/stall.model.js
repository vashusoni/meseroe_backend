// models/stall.model.js

const mongoose = require('mongoose');

const stallSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  address: {
    type: String,
    required: true
  },
  coordinates: {
    lat: Number,
    lng: Number
  },
  openTime: String,
  closeTime: String,
  serviceType: {
    type: String,
    enum: ['dine-in', 'takeaway', 'delivery', 'all'],
    default: 'all'
  },
  category: {
    type: String,
    enum: ['veg', 'non-veg', 'both'],
    default: 'veg'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Stall', stallSchema);
