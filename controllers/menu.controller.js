// controllers/menu.controller.js

const Menu = require('../models/menu.model');

exports.createMenu = async (req, res) => {
  try {
    const { stallId } = req.params;
    const { items } = req.body;

    const newMenu = new Menu({
      stall: stallId,
      items
    });

    await newMenu.save();
    res.status(201).json({ message: 'Menu created successfully', menu: newMenu });
  } catch (err) {
    res.status(500).json({ message: 'Error creating menu', error: err.message });
  }
};

exports.getMenuByStall = async (req, res) => {
  try {
    const { stallId } = req.params;
    const menu = await Menu.findOne({ stall: stallId }).sort({ date: -1 });

    if (!menu) {
      return res.status(404).json({ message: 'No menu found' });
    }

    res.status(200).json(menu);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving menu', error: err.message });
  }
};
