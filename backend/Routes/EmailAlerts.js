const nodemailer = require('nodemailer');
const cron = require('node-cron');
const User = require('./Users'); // Import User model
const Job = require('./Jobs');   // Import Job model


// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL, // Your email
    pass: process.env.EMAIL_PASSWORD, // App password for Gmail
  },
});

// Function to send job alert emails
const sendJobAlert = async (user, jobs) => {
  if (!jobs || jobs.length === 0) {
    console.log(`No remote jobs to send to user: ${user.email}`);
    return;
  }

  const emailBody = `
    Hi ${user.name},

    Here are the latest remote job updates available for you:

    ${jobs.map(job => `- ${job.title} at ${job.company} (${job.location})`).join('\n')}

    Visit our website for more details.
  `;

  const mailOptions = {
    from: process.env.EMAIL,
    to: user.email,
    subject: 'New Remote Job Alerts',
    text: emailBody,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Remote job alert sent to ${user.email}`);
  } catch (error) {
    console.error('Failed to send remote job alert to:', user.email, '| Error:', error.message);
  }
};

// Function to find remote jobs only
const findMatchingJobs = async (Job) => {
  try {
    const jobs = await Job.find({ location: { $regex: 'Remote', $options: 'i' } }).lean();
    console.log('Found jobs:', jobs); // Debug log
    return jobs;
  } catch (error) {
    console.error('Error finding remote jobs:', error.message);
    return [];
  }
};

// Cron job to schedule daily email notifications for remote jobs
cron.schedule('0 9 * * *', async () => { // Runs daily at 9:00 AM
  console.log('Running remote email notification task...');
  try {
    const users = await User.find(); // Fetch all users
    const remoteJobs = await findRemoteJobs(); // Fetch all remote jobs

    for (const user of users) {
      console.log(`Sending remote jobs to user: ${user.email}`); // Debug user email
      await sendJobAlert(user, remoteJobs); // Send all remote jobs
    }
    console.log('Remote email notifications sent!');
  } catch (error) {
    console.error('Error during remote email notification task:', error.message);
  }
});

module.exports = { sendJobAlert, findMatchingJobs };
