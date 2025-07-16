// controllers/stall.controller.js

const Stall = require('../models/stall.model');

// Create a new stall
exports.createStall = async (req, res) => {
  try {
    const { name, address, coordinates, openTime, closeTime, serviceType, category } = req.body;

    const newStall = new Stall({
      name,
      address,
      coordinates,
      openTime,
      closeTime,
      serviceType,
      category,
      ownerId: req.user.id
    });

    await newStall.save();
    res.status(201).json({ message: 'Stall created successfully', stall: newStall });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all stalls (optionally nearby later)
exports.getAllStalls = async (req, res) => {
  try {
    const stalls = await Stall.find().populate('ownerId', 'name email');
    res.status(200).json(stalls);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
