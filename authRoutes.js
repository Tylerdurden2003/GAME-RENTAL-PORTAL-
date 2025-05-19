const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  verifyOtp,
  generateAndSendOtp
} = require('../controllers/authController');

// Register a new user
router.post('/register', registerUser);

// Login user
router.post('/login', loginUser);

// Generate and send OTP to user's email
router.post('/generateOtp', generateAndSendOtp);  // Renamed to match the Postman URL

// Verify the OTP
router.post('/verifyOtp', verifyOtp);

module.exports = router;

