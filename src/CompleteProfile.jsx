import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './css/CompleteProfile.css';

const CompleteProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state?.user;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    firstName: '',
    lastName: '',
    role: '',
    gender: '',
    currentRole: '',
    location: '',
    education: [{ degree: '', institution: '', year: '' }],
    experience: [{ jobTitle: '', company: '', duration: '' }],
    projects: [{ title: '', description: '', techStack: '' }],
    socialLinks: { github: '', linkedin: '', codechef: '', leetcode: '' },
    resume: ''
  });

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    if (userData) {
      setFormData(prev => ({
        ...prev,
        name: userData.name,
        email: userData.email,
        mobile: userData.mobile
      }));
    }
  }, [userData]);

  const handleChange = (e, section, index, field) => {
    if (section === 'socialLinks') {
      setFormData({ ...formData, socialLinks: { ...formData.socialLinks, [field]: e.target.value } });
    } else if (Array.isArray(formData[section])) {
      const updated = [...formData[section]];
      updated[index][field] = e.target.value;
      setFormData({ ...formData, [section]: updated });
    } else {
      setFormData({ ...formData, [field]: e.target.value });
    }
  };

  const handlePasswordChange = () => {
    alert('Password change functionality will be added soon.');
  };

  const handleProfilePhotoUpload = (e) => {
    setProfileImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleConfirm = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${userData.id}/complete-profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, profileCompleted: true })
      });

      if (response.ok) {
        alert('Profile updated successfully!');
        navigate('/');
      } else {
        const error = await response.json();
        alert(`Update failed: ${error.message}`);
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred while updating profile.');
    }
  };

  const handleSkip = () => navigate('/');

  const addField = (section) => {
    const newItem = section === 'education'
      ? { degree: '', institution: '', year: '' }
      : section === 'experience'
      ? { jobTitle: '', company: '', duration: '' }
      : { title: '', description: '', techStack: '' };
  
    setFormData({ ...formData, [section]: [...formData[section], newItem] });
  };
  
  const removeField = (section, index) => {
    const updated = [...formData[section]];
    updated.splice(index, 1);
    setFormData({ ...formData, [section]: updated });
  };
  

  return (
    <div className="profile-wrapper">
      <aside className="profile-sidebar ">
      <h3 style={{margin:"0px"}}>Profile Photo</h3>
        <img
        src={profileImage || '../public/img_avatar.png'} 
        alt="Profile Preview"
        className="profile-preview"
      />
      <input type="file" accept="image/*" onChange={handleProfilePhotoUpload} />
        <div className="password-section" >
          <h4>Change Password</h4>
          <label style={{fontSize:"1rem"}} htmlFor="oldpass">Old Password</label>
          <input id='oldpass' type="password" placeholder="Old Password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
          <label style={{fontSize:"1rem"}} htmlFor="newpass">New Password</label>
          <input id='newpass' type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          <button  onClick={handlePasswordChange}>Change Password</button>
        </div>
      </aside>
      <main className="profile-main">
        <h2 style={{margin:"0px"}}>Profile Information</h2>
        <p>Fill in the details below</p>

        <div className="form-grid">
          <label htmlFor="user-name">Username</label>
          <input type="text"   id="user-name" style={{height:"35px"}} placeholder='Username' value={formData.firstName} onChange={(e) => handleChange(e, null, null, 'username')}/>
          <label htmlFor="fi-name">First name</label>
          <input id='fi-name' placeholder="First Name" value={formData.firstName} onChange={(e) => handleChange(e, null, null, 'firstName')} />
          <label htmlFor="l-name">Last Name</label>
          <input id='l-name' placeholder="Last Name" value={formData.lastName} onChange={(e) => handleChange(e, null, null, 'lastName')} />
          <label htmlFor="gender">Gender</label>
          <input id='gender' placeholder="Gender" value={formData.gender} onChange={(e) => handleChange(e, null, null, 'gender')} />
          <label htmlFor="role">Role</label>
          <input id='role' placeholder="Current Role" value={formData.currentRole} onChange={(e) => handleChange(e, null, null, 'currentRole')} />
          <label htmlFor="mobile">Contact</label>
          <input id='mobile' placeholder="Contact Number" value={formData.contactNumber} onChange={(e) => handleChange(e, null, null, 'mobile')} />
        </div>

        <hr className="divider" />

        <div className="form-grid">
          <label htmlFor="location">Location</label>
          <input
            id="location"
            placeholder="Location"
            value={formData.location}
            onChange={(e) => handleChange(e, null, null, 'location')}
          />

          <label htmlFor="github">GitHub</label>
          <input
            id="github"
            placeholder="GitHub"
            value={formData.socialLinks.github}
            onChange={(e) => handleChange(e, 'socialLinks', null, 'github')}
          />

            <label htmlFor="linkedin">LinkedIn</label>
            <input
              id="linkedin"
              placeholder="LinkedIn"
              value={formData.socialLinks.linkedin}
              onChange={(e) => handleChange(e, 'socialLinks', null, 'linkedin')}
            />

            <label htmlFor="resume">Resume URL</label>
            <input
              id="resume"
              placeholder="Resume URL"
              value={formData.resume}
              onChange={(e) => handleChange(e, null, null, 'resume')}
            />
          </div>

        {/* Education Section */}
          <h3>Education</h3>
          {formData.education.map((edu, index) => (
            <div key={index} className="form-grid">
              <input placeholder="Degree" value={edu.degree} onChange={(e) => handleChange(e, 'education', index, 'degree')} />
              <input placeholder="Institution" value={edu.institution} onChange={(e) => handleChange(e, 'education', index, 'institution')} />
              <input placeholder="Year" value={edu.year} onChange={(e) => handleChange(e, 'education', index, 'year')} />
              <button onClick={() => removeField('education', index)}>Remove</button>
            </div>
          ))}
          <button onClick={() => addField('education')}>Add Education</button>

          {/* Experience Section */}
          <h3>Experience</h3>
          {formData.experience.map((exp, index) => (
            <div key={index} className="form-grid">
              <input placeholder="Job Title" value={exp.jobTitle} onChange={(e) => handleChange(e, 'experience', index, 'jobTitle')} />
              <input placeholder="Company" value={exp.company} onChange={(e) => handleChange(e, 'experience', index, 'company')} />
              <input placeholder="Duration" value={exp.duration} onChange={(e) => handleChange(e, 'experience', index, 'duration')} />
              <button onClick={() => removeField('experience', index)}>Remove</button>
            </div>
          ))}
          <button onClick={() => addField('experience')}>Add Experience</button>

          {/* Projects Section */}
          <h3>Projects</h3>
          {formData.projects.map((proj, index) => (
            <div key={index} className="form-grid">
              <input placeholder="Title" value={proj.title} onChange={(e) => handleChange(e, 'projects', index, 'title')} />
              <input placeholder="Description" value={proj.description} onChange={(e) => handleChange(e, 'projects', index, 'description')} />
              <input placeholder="Tech Stack" value={proj.techStack} onChange={(e) => handleChange(e, 'projects', index, 'techStack')} />
              <button onClick={() => removeField('projects', index)}>Remove</button>
            </div>
          ))}
          <button onClick={() => addField('projects')}>Add Project</button>

          {/* Additional Social Links */}
          <input placeholder="CodeChef" value={formData.socialLinks.codechef} onChange={(e) => handleChange(e, 'socialLinks', null, 'codechef')} />
          <input placeholder="LeetCode" value={formData.socialLinks.leetcode} onChange={(e) => handleChange(e, 'socialLinks', null, 'leetcode')} />


        <div className="btn-actions">
          <button onClick={handleConfirm}>Confirm</button>
          <button onClick={handleSkip}>Skip</button>
        </div>
      </main>
    </div>
  );
};

export default CompleteProfile;
