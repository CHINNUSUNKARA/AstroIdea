const nodemailer = require('nodemailer');
const cron = require('node-cron');
const User = require('./Users'); // Import User model
const Job = require('./Jobs');   // Import Job model

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "flyhiytesting@gmail.com", // Your email
    pass: "codhtlkdusajllhb", // App password for Gmail
  },
});


const fetchLastJob = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/jobs'); // Use fetch to call the API
    const jobs = await response.json(); // Parse the JSON response

    // Find the latest job from the fetched data (assuming jobs are sorted by postedDate descending)
    const lastJob = jobs.find(job => job.status === 'Active');
    return lastJob || null; // Return the most recent active job or null if none exist
  } catch (error) {
    console.error('Error fetching last job from API:', error.message);
    return null;
  }
};


const sendJobAlert = async (user, job) => {
  if (!job) {
    console.log(`No active job available to send to user: ${user.email}`);
    return;
  }

  const emailBody = `
    Hi ${user.name},

    Here is the latest job update available for you:

    - ${job.title} at ${job.company} (${job.location})
    Description: ${job.description}

    Visit our website for more details.
  `;

  const mailOptions = {
    from: process.env.EMAIL,
    to: user.email,
    subject: 'Latest Job Alert',
    text: emailBody,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Job alert sent to ${user.email}`);
  } catch (error) {
    console.error(`Failed to send job alert to ${user.email}:`, error.message);
  }
};

const findMatchingJobs = async (criteria) => {
  if (!criteria) {
    console.log('No criteria provided. Returning all active jobs.');
    return await Job.find({ status: 'Active' }).lean(); // Default to fetching all active jobs
  }

  try {
    return await Job.find({
      status: 'Active', // Only active jobs
      $or: [
        { title: { $regex: criteria.title || '', $options: 'i' } }, // Match title
        { location: { $regex: criteria.location || '', $options: 'i' } }, // Match location
        { company: { $regex: criteria.company || '', $options: 'i' } }, // Match company
      ],
    }).lean(); // Optimized query
  } catch (error) {
    console.error('Error finding matching jobs:', error.message);
    return []; // Return empty array on error
  }
};



// Function to fetch all users
const fetchUsers = async () => {
  try {
    const users = await User.find({ status: 'Active' }).lean(); // Fetch only active users
    console.log(`Found ${users.length} active users.`);
    return users;
  } catch (error) {
    console.error('Error fetching users:', error.message);
    return [];
  }
};

// Cron job to schedule daily email notifications for remote jobs
cron.schedule('0 9 * * *', async () => { // Runs daily at 9:00 AM
  console.log('Running scheduled email notification task...');
  try {
    const users = await fetchUsers(); // Fetch all active users
    if (users.length === 0) {
      console.log('No users found to send emails to.');
      return;
    }

    const remoteJobs = await fetchJobs(); // Fetch all remote jobs
    if (remoteJobs.length === 0) {
      console.log('No remote jobs available for notifications.');
      return;
    }

    await sendJobAlert(users, remoteJobs); // Send job alerts to users
    console.log('Email notifications sent successfully!');
  } catch (error) {
    console.error('Error during email notification task:', error.message);
  }
});

module.exports = { sendJobAlert, fetchLastJob ,findMatchingJobs , fetchUsers };
