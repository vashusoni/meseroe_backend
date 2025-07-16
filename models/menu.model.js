// models/menu.model.js

const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  stallId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Stall',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  quantity: String,
  price: {
    type: Number,
    required: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
