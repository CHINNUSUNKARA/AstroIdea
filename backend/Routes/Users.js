const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { isValidObjectId } = require('mongoose');
const bcrypt = require('bcryptjs');


  const UserSchema = new mongoose.Schema({
    // Basic Info for Signup
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: String, required: true },
  
    // Track whether user has completed full profile
    profileCompleted: { type: Boolean, default: false },
  
    // Account status
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active'
    },
  
    // Additional Profile Info
    location: { type: String },
  
    education: [
      {
        degree: { type: String },
        institution: { type: String },
        year: { type: String }
      }
    ],
  
    experience: [
      {
        jobTitle: { type: String },
        company: { type: String },
        duration: { type: String }
      }
    ],
  
    projects: [
      {
        title: { type: String },
        description: { type: String },
        techStack: { type: String }
      }
    ],
  
    socialLinks: {
      github: { type: String },
      linkedin: { type: String },
      codechef: { type: String },
      leetcode: { type: String }
    },
  
    resume: { type: String }
  });  

  // Pre-save middleware to hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // If not changed, skip
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


const User = mongoose.model('User', UserSchema);

router.put('/:id/complete-profile', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { ...req.body, profileCompleted: true },
      { new: true }
    );
    res.status(200).json({ message: 'Profile updated', user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: 'Error updating profile' });
  }
});


// routes/auth.js

router.post('/api/users', async (req, res) => {
  const { name, email, password, mobile } = req.body;

  if (!name || !email || !password || !mobile) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const newUser = new User({
      name,
      email,
      mobile,
      password, // Will be hashed by schema middleware
      profileCompleted: false,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    console.error('Registration Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


// routes/auth.js

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 2. Compare plain password with hashed one
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // 3. Login success
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profileCompleted: user.profileCompleted,
      }
    });

  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});



router.post('/api/users', async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all users with filtering and pagination
router.get('/api/users', async (req, res) => {
  try {
    const { name, location, email, page = 1, limit = 10 } = req.query;

    // Build a dynamic filter object
    const filter = {};
    if (name) filter.name = { $regex: name, $options: 'i' };
    if (location) filter.location = { $regex: location, $options: 'i' };
    if (email) filter.email = { $regex: email, $options: 'i' };

    // Implement pagination
    const skip = (page - 1) * limit;
    const users = await User.find(filter).skip(skip).limit(Number(limit));
    const totalUsers = await User.countDocuments(filter); // Count total matching users

    res.status(200).json({
      totalUsers,
      currentPage: Number(page),
      totalPages: Math.ceil(totalUsers / limit),
      users,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// Get a single user by ID or search by name and location
router.get('/api/users/:idOrName', async (req, res) => {
  try {
    const { idOrName } = req.params;
    const { location } = req.query;

    let user;

    // Check if the parameter is an ID
    if (idOrName.match(/^[0-9a-fA-F]{24}$/)) {
      user = await User.findById(idOrName);
    } else {
      // Otherwise, treat it as a name and optionally filter by location
      const filter = { name: { $regex: idOrName, $options: 'i' } };
      if (location) filter.location = { $regex: location, $options: 'i' };

      user = await User.find(filter);
    }

    if (!user || (Array.isArray(user) && user.length === 0)) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.put('/api/users/:idOrPhone', async (req, res) => {
  try {
    let updatedUser;
    if (isValidObjectId(req.params.idOrPhone)) {
      // Search by ID
      updatedUser = await User.findByIdAndUpdate(req.params.idOrPhone, req.body, {
        new: true,
        runValidators: true,
      });
    } else {
      // Search by phone number
      updatedUser = await User.findOneAndUpdate({ phone: req.params.idOrPhone }, req.body, {
        new: true,
        runValidators: true,
      });
    }

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.delete('/api/users/:idOrPhone', async (req, res) => {
  try {
    let deletedUser;
    if (isValidObjectId(req.params.idOrPhone)) {
      // Search by ID
      deletedUser = await User.findByIdAndDelete(req.params.idOrPhone);
    } else {
      // Search by phone number
      deletedUser = await User.findOneAndDelete({ phone: req.params.idOrPhone });
    }

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;