// routes/auth.routes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Register
router.post('/register', authController.register);

// Login
router.post('/login', authController.login);
// send otp
router.post('/sendOtp', authController.sendOtp);
// verify otp
router.post('/verifyOtp', authController.verifyOtp);

module.exports = router;
