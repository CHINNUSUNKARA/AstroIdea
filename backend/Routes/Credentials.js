const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer'); // Install with `npm install nodemailer`
const crypto = require('crypto'); // For generating random OTPs


const mongoose = require('mongoose');

// Define OTP Schema
const OTPSchema = new mongoose.Schema({
  email: { type: String, required: true }, // Email associated with the OTP
  otp: { type: String, required: true },  // Generated OTP
  createdAt: { type: Date, default: Date.now, expires: 300 }, // Expire after 5 minutes
});

const OTP = mongoose.model('OTP', OTPSchema);

// Generate OTP and Send Email
router.post('/generate-otp', async (req, res) => {
  const { email } = req.body;

  // Generate a 6-digit OTP
  const otp = crypto.randomInt(100000, 999999).toString();

  try {
    // Save OTP in the database
    const newOTP = new OTP({ email, otp });
    await newOTP.save();

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Use your email service provider
      auth: {
        user: process.env.EMAIL, // Your email
        pass: process.env.EMAIL_PASSWORD, // Your email password
      },
    });

    // Send OTP Email
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP is: ${otp}. It will expire in 5 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send OTP', error: error.message });
  }
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Find OTP in the database
    const validOTP = await OTP.findOne({ email, otp });

    if (!validOTP) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // OTP is valid; delete it from the database
    await OTP.deleteOne({ email, otp });

    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error verifying OTP', error: error.message });
  }
});

module.exports = router;
