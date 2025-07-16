// routes/stall.routes.js

const express = require('express');
const router = express.Router();
const stallController = require('../controllers/stall.controller');
const verifyToken = require('../middleware/auth.middleware');

// Protected route: only logged-in user can create stall
router.post('/', verifyToken, stallController.createStall);

// Public route: list all stalls
router.get('/', stallController.getAllStalls);

module.exports = router;
