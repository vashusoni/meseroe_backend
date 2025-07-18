const mongoose = require("mongoose");

const stallSchema = new mongoose.Schema({
  stallName: {
    type: String,

    required: true,
  },
  stallMobileNumber: {
    type: String,
    required: true,
    match: [/^[6-9]\d{9}$/, "Please enter a valid Indian mobile number"],
  },
  stallAddress: {
    type: String,
    required: true,
  },
  stallLat: {
    type: Number,
    required: true,
  },
  stallLng: {
    type: Number,
    required: true,
  },
  stallOpenTime: {
    type: String,
    required: true,
  },
  stallCloseTime: {
    type: String,
    required: true,
  },
  stallCategory: {
    type: String,
    enum: ["veg", "non-veg", "both"],
    default: "veg",
  },
  stallService: {
    type: String,
    enum: ["takeaway", "delivery", "dining", "all"],
    default: "all",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("StallAccount", stallSchema);
