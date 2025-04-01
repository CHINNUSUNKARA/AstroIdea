import React, { useState, useEffect } from 'react';
import NavBar from './NavBar'


function JobSearchApplication() {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [application, setApplication] = useState({
    jobId: '',
    name: '',
    email: '',
    resume: null,
  });

  // Fetch jobs from API
  const handleFetchJobs = async () => {
    try {
      const response = await fetch('https://api.example.com/jobs'); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  // Fetch jobs on component mount
  useEffect(() => {
    handleFetchJobs();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleApply = (jobId) => {
    setApplication({ ...application, jobId });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setApplication({ ...application, [name]: value });
  };

  const handleResumeUpload = (e) => {
    setApplication({ ...application, resume: e.target.files[0] });
  };

  const submitApplication = () => {
    alert(
      `Application submitted for Job ID: ${application.jobId}\nName: ${application.name}\nEmail: ${application.email}`
    );
    setApplication({
      jobId: '',
      name: '',
      email: '',
      resume: null,
    });
  };

  return (
    <div>
              <NavBar />
      <h1>Job Search and Application</h1>

      {/* Job Search */}
      <input
        type="text"
        placeholder="Search for jobs"
        value={searchQuery}
        onChange={handleSearch}
        style={{ padding: '10px', width: '300px', margin: '20px 0' }}
      />

      {/* Job Listings */}
      <div>
        {filteredJobs.map((job) => (
          <div key={job.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
            <h2>{job.title}</h2>
            <p>Company: {job.company}</p>
            <p>Location: {job.location}</p>
            <p>{job.description}</p>
            <button onClick={() => handleApply(job.id)}>Apply</button>
          </div>
        ))}
      </div>

      {/* Application Form */}
      {application.jobId && (
        <div style={{ marginTop: '20px' }}>
          <h2>Apply for Job ID: {application.jobId}</h2>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={application.name}
            onChange={handleInputChange}
            style={{ padding: '10px', width: '300px', margin: '10px 0' }}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={application.email}
            onChange={handleInputChange}
            style={{ padding: '10px', width: '300px', margin: '10px 0' }}
          />
          <input
            type="file"
            name="resume"
            onChange={handleResumeUpload}
            style={{ margin: '10px 0' }}
          />
          <button onClick={submitApplication} style={{ padding: '10px 15px', marginTop: '10px' }}>
            Submit Application
          </button>
        </div>
      )}
    </div>
  );
}

export default JobSearchApplication;