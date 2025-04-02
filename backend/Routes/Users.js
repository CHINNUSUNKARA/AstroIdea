const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  education: [
    {
      degree: { type: String, required: true },
      institution: { type: String, required: true },
      year: { type: String, required: true },
    },
  ],
  experience: [
    {
      jobTitle: { type: String, required: true },
      company: { type: String, required: true },
      duration: { type: String, required: true },
    },
  ],
  projects: [
    {
      title: { type: String, required: true },
      description: { type: String, required: true },
      techStack: { type: String, required: true },
    },
  ],
  socialLinks: {
    github: { type: String },
    linkedin: { type: String },
    codechef: { type: String },
    leetcode: { type: String },
  },
  resume: { type: String }, 
});

const User = mongoose.model('User', UserSchema);

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


// Update a user by ID
router.put('/api/users/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a user by ID
router.delete('/api/users/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
