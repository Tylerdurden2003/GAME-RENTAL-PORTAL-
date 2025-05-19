const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const otpGenerator = require('otp-generator');  // Optional: for random OTP generation
const nodemailer = require('nodemailer');
const crypto = require('crypto');

let otpStore = {};  // Temporary in-memory storage for OTPs

const HARD_CODED_OTP = '606589';  // Replace with real OTP in production

// Nodemailer transporter for sending OTP emails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASS, // Your Gmail app password
  },
});

// Register user
exports.registerUser = async (req, res) => {
  const { name, email, mobile, password } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { mobile }] });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, mobile, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    if (!user.password) {
      return res.status(400).json({ message: 'User has no password set. Please register again.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Generate OTP (currently hardcoded)
exports.generateOtp = () => {
  return HARD_CODED_OTP;

  // For dynamic generation, use:
  // return otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false });
};

// Function to send OTP email
exports.sendOtpEmail = async (email, otp) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender email address
      to: email,                    // Recipient email address
      subject: 'Your OTP Code',
      text: `Your OTP code is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);
    console.log('OTP sent successfully to:', email);
  } catch (error) {
    console.error('Error sending OTP:', error);
  }
};

// Generate and send OTP
exports.generateAndSendOtp = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email || !email.includes('@')) {
      return res.status(400).json({ message: 'Invalid email address' });
    }

    const otp = this.generateOtp(); // Generate OTP
    const otpId = crypto.randomBytes(16).toString('hex');

    // Store OTP in memory with a unique OTP ID
    otpStore[otpId] = { otpId, otp, email, createdAt: Date.now() };

    // Send OTP via email
    await this.sendOtpEmail(email, otp);

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('OTP sending error:', error);
    res.status(500).json({ message: 'Error sending OTP' });
  }
};

// Verify OTP
exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  const otpData = Object.values(otpStore).find(data => data.email === email);

  if (!otpData) {
    return res.status(400).json({ message: 'No OTP request found for this email' });
  }

  const otpAge = Date.now() - otpData.createdAt;
  if (otpAge > 300000) {  // OTP expires after 5 minutes (300,000 ms)
    delete otpStore[otpData.otpId];  // Clean up expired OTP
    return res.status(400).json({ message: 'OTP has expired' });
  }

  if (otp === otpData.otp) {
    delete otpStore[otpData.otpId];  // Clean up OTP after successful verification
    return res.status(200).json({ message: 'OTP verified successfully' });
  } else {
    return res.status(400).json({ message: 'Invalid OTP' });
  }
};





