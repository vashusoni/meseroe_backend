const express = require('express');
const router = express.Router();
const stallController = require('../controllers/stall.controller');
const verifyToken = require('../middleware/auth.middleware');

// 🔐 Protected Routes (only accessible to logged-in users)
router.post('/', verifyToken, stallController.createStall);          // Create stall
router.get('/my', verifyToken, stallController.getStall);      // Get stall of logged-in user
router.put('/my', verifyToken, stallController.updateStall);         // Update stall of logged-in user
router.delete('/my', verifyToken, stallController.deleteStall);      // Delete stall of logged-in user

// 🌐 Public Route (optional)
router.get('/', stallController.getAllStalls);                       // Get all stalls (public)

module.exports = router;
