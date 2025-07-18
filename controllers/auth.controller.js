// controllers/auth.controller.js

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const StallMobiles = require("../models/stallMobiles.model");
const StallAccount = require("../models/stallAccount.model");
const crypto = require("crypto"); // for generating strong unique string
const { encryptText } = require("../Utils/encryptUtils");

// Register a new user
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save new user
    const newUser = new User({ name, email, password: hashedPassword, mobile });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login a user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, mobile: user.mobile },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// In-memory OTP store (production में Redis use करें)
const otpStore = {};

// 🔹 1. OTP भेजना
exports.sendOtp = async (req, res) => {
  try {
    const { mobile } = req.body;
    if (!mobile)
      return res.status(400).json({ message: "Mobile number required" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[mobile] = otp;

    // DEMO: असली ऐप में SMS API से भेजें
    console.log(`Sending OTP to ${mobile}: ${otp}`);

    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { mobile, otp } = req.body;

    if (!otpStore[mobile] || otpStore[mobile] !== otp) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }
    const stallAccount = await StallAccount.findOne({
      stallMobileNumber: mobile,
    });
    const isAccountCreated = !!stallAccount;
    let stall = await StallMobiles.findOne({ stallMobile: mobile });
    if (!stall) {
      const encryptedMobile = encryptText(mobile);
      const qrCode = crypto.randomUUID();
      stall = new StallMobiles({
        stallMobile: mobile,
        qrCode: qrCode + encryptedMobile,
      });

      await stall.save();
    }

    const token = jwt.sign(
      { id: stall.qrCode, mobile: stall.stallMobile },
      process.env.JWT_SECRET
    );

    delete otpStore[mobile]; // OTP expire कर दो

    return res.status(200).json({
      token,
      success: true,
      message: "Mobile linked with Stall ID. Successfully",
      isAccountCreated:isAccountCreated,
      data: {
        mobile: stall.stallMobile,
        stall_id: stall.qrCode,
      },
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
