const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const jobRoutes = require('./Routes/Jobs'); // Import the jobs module
const userRoutes = require('./Routes/Users'); // Import the users module
const otpRoutes = require('./Routes/Credentials')
const {UserSchema } = require('./Routes/Users'); // Replace with the actual path to your User model file
const User = mongoose.model('User', UserSchema);
const { sendJobAlert, findMatchingJobs }= require('./Routes/EmailAlerts'); // Adjust the path as needed


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


app.post('/api/send-job-alerts', async (req, res) => {
  const users = await User.find();
  try {
    for (const user of users) {
      const matchingJobs = await findMatchingJobs(user.preferredJobCriteria);
      if (matchingJobs.length > 0) {
        await sendJobAlert(user, matchingJobs);
      }
    }
    res.status(200).json({ message: 'Job alerts sent!' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send job alerts', error: error.message });
  }
});


app.use((err, req, res,next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
