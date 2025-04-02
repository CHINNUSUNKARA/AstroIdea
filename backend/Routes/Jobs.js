const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();


const JobSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Job title
  company: { type: String, required: true }, // Company name
  location: { type: String, required: true }, // Job location (e.g., Remote, City Name)
  jobType: { type: String, enum: ['Full-time', 'Part-time', 'Contract', 'Internship'], required: true }, // Job type
  salary: {
    min: { type: Number }, // Minimum salary
    max: { type: Number }, // Maximum salary
    currency: { type: String, default: 'INR' } // Currency
  },
  experienceRequired: {
    minYears: { type: Number }, // Minimum experience required
    maxYears: { type: Number } // Maximum experience required (optional)
  },
  description: { type: String, required: true }, // Job description
  skillsRequired: { type: [String], required: true }, // Required skills
  postedDate: { type: Date, default: Date.now }, // Date job was posted
  applicationDeadline: { type: Date }, // Deadline for applications
  employer: {
    name: { type: String, required: true }, // Employer/Recruiter name
    contactEmail: { type: String, required: true }, // Email of recruiter/employer
    phone: { type: String } // Contact phone number of recruiter/employer
  },
  status: { type: String, enum: ['Active', 'Closed'], default: 'Active' }, // Job status
  vacancies: { type: Number, default: 1 }, // Number of vacancies
  applicants: [{ 
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // User reference
    appliedOn: { type: Date, default: Date.now } // Application timestamp
  }]
});

const Job = mongoose.model('Job', JobSchema);
module.exports = Job;


router.post('/api/jobs', async (req, res) => {
  try {
    const job = new Job(req.body);
    const savedJob = await job.save();
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all jobs
router.get('/api/jobs', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single job by ID
router.get('/api/jobs/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a job by ID
router.put('/api/jobs/:id', async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a job by ID
router.delete('/api/jobs/:id', async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    if (!deletedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
