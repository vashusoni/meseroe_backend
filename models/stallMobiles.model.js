const mongoose = require("mongoose");

const stallSchema = new mongoose.Schema({
  stallMobile: {
    type: String,
    required: true,
    unique: true,
    match: [/^[6-9]\d{9}$/, "Please enter a valid Indian mobile number"],
  },
  qrCode: {
    type: String,
    required: true,
    unique: true, 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("StallMobiles", stallSchema);
