// controllers/stall.controller.js

const Stall = require("../models/stallAccount.model");

// Create a new stall
exports.createStall = async (req, res) => {
  try {
    const {
      stallName,
      stallMobileNumber,
      stallAddress,
      stallLat,
      stallLng,
      stallOpenTime,
      stallCloseTime,
      stallService,
      stallCategory,
    } = req.body;

    const newStall = new Stall({
      stallName,
      stallMobileNumber,
      stallAddress,
      stallLat,
      stallLng,
      stallOpenTime,
      stallCloseTime,
      stallService,
      stallCategory,
    });

    await newStall.save();
    res
      .status(201)
      .json({ message: "Stall created successfully", stall: newStall });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get stall by userId (assuming 1 user = 1 stall)
exports.getStall = async (req, res) => {
  try {
    const stall = await Stall.findOne({ ownerId: req.user.userId });
    if (!stall)
      return res.status(404).json({ message: "No stall found for this user" });

    return res.status(200).json({ stall });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error fetching stall", error: err.message });
  }
};

// 🔄 Update stall
exports.updateStall = async (req, res) => {
  try {
    const {
      stallName,
      stallAddress,
      stallLat,
      stallLng,
      stallOpenTime,
      stallCloseTime,
      stallCategory,
      stallService,
    } = req.body;

    const stall = await Stall.findOneAndUpdate(
      { ownerId: req.user.userId },
      {
        stallName,
        stallAddress,
        stallLat,
        stallLng,
        stallOpenTime,
        stallCloseTime,
        stallCategory,
        stallService,
      },
      { new: true }
    );

    if (!stall)
      return res.status(404).json({ message: "No stall found to update" });

    return res.status(200).json({ message: "Stall updated", stall });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error updating stall", error: err.message });
  }
};

// ❌ Delete stall
exports.deleteStall = async (req, res) => {
  try {
    const result = await Stall.findOneAndDelete({ ownerId: req.user.userId });
    if (!result)
      return res.status(404).json({ message: "No stall found to delete" });

    return res.status(200).json({ message: "Stall deleted successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error deleting stall", error: err.message });
  }
};

// Get all stalls (optionally nearby later)
exports.getAllStalls = async (req, res) => {
  try {
    const stalls = await Stall.find().populate("ownerId", "name email");
    res.status(200).json(stalls);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
