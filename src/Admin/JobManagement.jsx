import React, { useState } from 'react';
import '../css/JobManagement.css'

const JobManagement = () => {
  const [jobPostings, setJobPostings] = useState([
    { id: 1, title: 'Software Engineer', description: 'Develop cool stuff' },
    { id: 2, title: 'Product Manager', description: 'Lead product teams' },
  ]);
  const [newJob, setNewJob] = useState({ title: '', description: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editJob, setEditJob] = useState(null);

  // Handle Add Job Posting
  const handleAddJob = () => {
    if (newJob.title && newJob.description) {
      const newJobPost = {
        id: Date.now(),
        title: newJob.title,
        description: newJob.description,
      };
      setJobPostings([...jobPostings, newJobPost]);
      setNewJob({ title: '', description: '' }); // Reset form
    } else {
      alert('Please fill in both fields');
    }
  };

  // Handle Edit Job Posting
  const handleEditJob = (job) => {
    setIsEditing(true);
    setEditJob(job);
    setNewJob({ title: job.title, description: job.description });
  };

  const handleUpdateJob = () => {
    if (newJob.title && newJob.description) {
      const updatedJobs = jobPostings.map((job) =>
        job.id === editJob.id ? { ...job, ...newJob } : job
      );
      setJobPostings(updatedJobs);
      setNewJob({ title: '', description: '' });
      setIsEditing(false);
      setEditJob(null);
    } else {
      alert('Please fill in both fields');
    }
  };

  // Handle Delete Job Posting
  const handleDeleteJob = (jobId) => {
    const updatedJobs = jobPostings.filter((job) => job.id !== jobId);
    setJobPostings(updatedJobs);
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-heading">Admin Dashboard</h1>

      {/* Job Management Section */}
      <section className="section">
        <h2 className="section-heading">Job Management</h2>

        {/* Job Form (Create or Edit) */}
        <div className="job-form">
          <input
            type="text"
            placeholder="Job Title"
            value={newJob.title}
            onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
            className="input-field"
          />
          <textarea
            placeholder="Job Description"
            value={newJob.description}
            onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
            className="input-field"
          />
          {!isEditing ? (
            <button className="button" onClick={handleAddJob}>
              Add Job
            </button>
          ) : (
            <button className="button" onClick={handleUpdateJob}>
              Update Job
            </button>
          )}
        </div>

        {/* Display All Job Postings */}
        <div>
          {jobPostings.length > 0 ? (
            jobPostings.map((job) => (
              <div key={job.id} className="job-item">
                <h3>{job.title}</h3>
                <p>{job.description}</p>
                <button className="button" onClick={() => handleEditJob(job)}>
                  Edit
                </button>
                <button className="button delete-button" onClick={() => handleDeleteJob(job.id)}>
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p>No job postings available.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default JobManagement;
