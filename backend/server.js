const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const jobRoutes = require('./Routes/Jobs'); // Import the jobs module
const userRoutes = require('./Routes/Users'); // Import the users module
const otpRoutes = require('./Routes/Credentials')
const {UserSchema } = require('./Routes/Users'); // Replace with the actual path to your User model file
const User = mongoose.model('User', UserSchema);
const { sendJobAlert, fetchLastJob } = require('./Routes/EmailAlerts'); // Adjust the path as needed
const authRoutes = require('./Routes/Users');



dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); 

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

app.use(jobRoutes);
app.use(userRoutes)
app.use('/api', otpRoutes); // Ensure the prefix '/api' is added here
app.use('/api/auth', authRoutes);



app.post('/api/send-job-alerts', async (req, res) => {
  try {
    const users = await User.find({ status: 'Active' }); // Fetch active users
    if (users.length === 0) {
      return res.status(404).json({ message: 'No active users found to send job alerts.' });
    }

    const lastJob = await fetchLastJob(); // Fetch the last added job
    if (!lastJob) {
      return res.status(404).json({ message: 'No active job available to send alerts.' });
    }

    // Send job alerts to all active users
    await Promise.all(
      users.map(async (user) => {
        await sendJobAlert(user, lastJob);
      })
    );

    res.status(200).json({ message: 'Job alerts sent successfully!', job: lastJob });
  } catch (error) {
    console.error('Error during job alerts processing:', error.message);
    res.status(500).json({ message: 'Failed to send job alerts.', error: error.message });
  }
});

app.use((err, req, res,next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
