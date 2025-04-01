import React, { useState } from 'react';
import './css/ProfileEditing.css'

function ProfileEditing() {
  const [profile, setProfile] = useState({
    education: [{ degree: '', institution: '', year: '' }],
    experience: [{ jobTitle: '', company: '', duration: '' }],
    projects: [{ title: '', description: '', techStack: '' }],
    socialLinks: { GitHub: '', LinkedIn: '', CodeChef: '', LeetCode: '' },
    resume: null,
  });

  const handleInputChange = (section, index, field, value) => {
    const updatedSection = profile[section].map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setProfile({ ...profile, [section]: updatedSection });
  };

  const addNewField = (section) => {
    const newField =
      section === 'education'
        ? { degree: '', institution: '', year: '' }
        : section === 'experience'
        ? { jobTitle: '', company: '', duration: '' }
        : { title: '', description: '', techStack: '' };
    setProfile({ ...profile, [section]: [...profile[section], newField] });
  };

  const updateSocialLinks = (platform, value) => {
    setProfile({
      ...profile,
      socialLinks: { ...profile.socialLinks, [platform]: value },
    });
  };

  const handleResumeUpload = (event) => {
    setProfile({ ...profile, resume: event.target.files[0] });
  };

  return (
    <div>
      <h1>Profile Editing</h1>

      {/* Education Section */}
      <section>
        <h2>Education</h2>
        {profile.education.map((edu, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Degree"
              value={edu.degree}
              onChange={(e) =>
                handleInputChange('education', index, 'degree', e.target.value)
              }
            />
            <input
              type="text"
              placeholder="Institution"
              value={edu.institution}
              onChange={(e) =>
                handleInputChange('education', index, 'institution', e.target.value)
              }
            />
            <input
              type="text"
              placeholder="Year"
              value={edu.year}
              onChange={(e) =>
                handleInputChange('education', index, 'year', e.target.value)
              }
            />
          </div>
        ))}
        <button onClick={() => addNewField('education')}>Add Education</button>
      </section>

      {/* Experience Section */}
      <section>
        <h2>Experience</h2>
        {profile.experience.map((exp, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Job Title"
              value={exp.jobTitle}
              onChange={(e) =>
                handleInputChange('experience', index, 'jobTitle', e.target.value)
              }
            />
            <input
              type="text"
              placeholder="Company"
              value={exp.company}
              onChange={(e) =>
                handleInputChange('experience', index, 'company', e.target.value)
              }
            />
            <input
              type="text"
              placeholder="Duration"
              value={exp.duration}
              onChange={(e) =>
                handleInputChange('experience', index, 'duration', e.target.value)
              }
            />
          </div>
        ))}
        <button onClick={() => addNewField('experience')}>Add Experience</button>
      </section>

      {/* Projects Section */}
      <section>
        <h2>Projects</h2>
        {profile.projects.map((proj, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Title"
              value={proj.title}
              onChange={(e) =>
                handleInputChange('projects', index, 'title', e.target.value)
              }
            />
            <input
              type="text"
              placeholder="Description"
              value={proj.description}
              onChange={(e) =>
                handleInputChange('projects', index, 'description', e.target.value)
              }
            />
            <input
              type="text"
              placeholder="Tech Stack"
              value={proj.techStack}
              onChange={(e) =>
                handleInputChange('projects', index, 'techStack', e.target.value)
              }
            />
          </div>
        ))}
        <button onClick={() => addNewField('projects')}>Add Project</button>
      </section>

      {/* Social Media Links Section */}
      <section>
        <h2>Social Media Links</h2>
        {Object.keys(profile.socialLinks).map((platform) => (
          <div key={platform}>
            <label>{platform}: </label>
            <input
              type="text"
              value={profile.socialLinks[platform]}
              onChange={(e) => updateSocialLinks(platform, e.target.value)}
            />
          </div>
        ))}
      </section>

      {/* Resume Upload Section */}
      <section>
        <h2>Resume</h2>
        <input type="file" onChange={handleResumeUpload} />
        {profile.resume && <p>Uploaded: {profile.resume.name}</p>}
      </section>
    </div>
  );
}

export default ProfileEditing;
