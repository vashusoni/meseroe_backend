// routes/menu.routes.js

const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menu.controller");
const verifyToken = require("../middleware/auth.middleware");

// Add menu to a stall (only logged-in user)
router.post("/:stallId", verifyToken, menuController.createMenu);

// Get menu for a stall (public)
router.get("/:stallId", menuController.getMenuByStall);

module.exports = router;
