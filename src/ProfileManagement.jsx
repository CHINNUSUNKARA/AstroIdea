import React, { useState } from 'react';
import './css/ProfileManagement.css'
import NavBar from './NavBar'


function ProfileManagement() {
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [projects, setProjects] = useState([]);
  const [socialLinks, setSocialLinks] = useState({});
  const [resume, setResume] = useState(null);

  const handleFileUpload = (event) => {
    setResume(event.target.files[0]);
  };

  const addEducation = () => {
    setEducation([
      ...education,
      { degree: '', institution: '', year: '' }
    ]);
  };

  const addExperience = () => {
    setExperience([
      ...experience,
      { jobTitle: '', company: '', duration: '' }
    ]);
  };

  const addProject = () => {
    setProjects([
      ...projects,
      { title: '', description: '', techStack: '' }
    ]);
  };

  const handleLinkChange = (platform, value) => {
    setSocialLinks({ ...socialLinks, [platform]: value });
  };

  return (
    <div>
              <NavBar />
      <h1>Profile Management</h1>

      {/* Education Section */}
      <section>
        <h2>Education</h2>
        {education.map((edu, index) => (
          <div key={index}>
            <input type="text" placeholder="Degree" />
            <input type="text" placeholder="Institution" />
            <input type="text" placeholder="Year" />
          </div>
        ))}
        <button onClick={addEducation}>Add Education</button>
      </section>

      {/* Experience Section */}
      <section>
        <h2>Experience</h2>
        {experience.map((exp, index) => (
          <div key={index}>
            <input type="text" placeholder="Job Title" />
            <input type="text" placeholder="Company" />
            <input type="text" placeholder="Duration" />
          </div>
        ))}
        <button onClick={addExperience}>Add Experience</button>
      </section>

      {/* Projects Section */}
      <section>
        <h2>Projects</h2>
        {projects.map((proj, index) => (
          <div key={index}>
            <input type="text" placeholder="Project Title" />
            <input type="text" placeholder="Description" />
            <input type="text" placeholder="Tech Stack" />
          </div>
        ))}
        <button onClick={addProject}>Add Project</button>
      </section>

      {/* Social Media Links Section */}
      <section>
        <h2>Social Media Links</h2>
        {['GitHub', 'LinkedIn', 'CodeChef', 'LeetCode'].map((platform) => (
          <div key={platform}>
            <label>{platform}: </label>
            <input
              type="text"
              onChange={(e) => handleLinkChange(platform, e.target.value)}
            />
          </div>
        ))}
      </section>

      {/* Resume Upload Section */}
      <section>
        <h2>Resume</h2>
        <input type="file" onChange={handleFileUpload} />
        {resume && <p>Uploaded: {resume.name}</p>}
      </section>
    </div>
  );
}

export default ProfileManagement;