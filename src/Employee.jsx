import React, { useRef, useState } from 'react';
import NavBar from './NavBar';
import './css/Employee.css';

const Employee = () => {
  const editorRef = useRef(null);

  const [formData, setFormData] = useState({
    jobTitle: '',
    tags: '',
    role: '',
    minSalary: '',
    maxSalary: '',
    currency: 'INR',
    maxCurrency: 'INR',
    salaryType: 'monthly',
    vacancies: '',
    jobLevel: '',
    country: 'India',
    city: 'Hyderabad',
    description: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const jobDescription = editorRef.current.innerHTML;

    const payload = {
      ...formData,
      description: jobDescription,
    };

    try {
      const res = await fetch('http://localhost:5000/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert('Job posted successfully!');
        setFormData({
          jobTitle: '',
          tags: '',
          role: '',
          minSalary: '',
          maxSalary: '',
          currency: 'USD',
          maxCurrency: 'USD',
          salaryType: 'monthly',
          vacancies: '',
          jobLevel: '',
          country: 'India',
          city: 'Hyderabad',
          description: '',
        });
        editorRef.current.innerHTML = '';
      } else {
        alert('Failed to post job.');
      }
    } catch (error) {
      console.error(error);
      alert('Error posting job.');
    }
  };

  const applyCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
  };

  return (
    <div className="employee-page">
      <NavBar />
      <form className='card-employee' onSubmit={handleSubmit}>
        <h1 id="title">Post a job</h1>
        <p className='add'>Find the best talent for your company</p>

        <label htmlFor="jobTitle">Job Title</label>
        <input
          type="text"
          id="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
          placeholder="Add job title, role vacancies etc"
        />

        <label htmlFor="tags">Tags</label>
        <input
          type="text"
          id="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="Job keyword, tags etc."
        />

        <label htmlFor="role">Job Role</label>
        <select id="role" value={formData.role} onChange={handleChange}>
          <option value="">Select...</option>
          <option value="developer">Developer</option>
          <option value="designer">Designer</option>
          <option value="manager">Manager</option>
        </select>

        <br /><br />
        <label>Salary</label><br />
        <div className="salary-row">
          <div>
            <label htmlFor="minSalary">Min Salary</label>
            <input
              type="text"
              id="minSalary"
              value={formData.minSalary}
              onChange={handleChange}
              placeholder="Minimum Salary"
            />
            <select id="currency" value={formData.currency} onChange={handleChange}>
              <option value="USD">USD</option>
              <option value="INR">INR</option>
              <option value="EUR">EUR</option>
            </select>
          </div>
          <div>
            <label htmlFor="maxSalary">Max Salary</label>
            <input
              type="text"
              id="maxSalary"
              value={formData.maxSalary}
              onChange={handleChange}
              placeholder="Maximum Salary"
            />
            <select id="maxCurrency" value={formData.maxCurrency} onChange={handleChange}>
              <option value="USD">USD</option>
              <option value="INR">INR</option>
              <option value="EUR">EUR</option>
            </select>
          </div>
          <div>
            <label htmlFor="salaryType">Type</label>
            <select id="salaryType" value={formData.salaryType} onChange={handleChange}>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        </div>

        <label htmlFor="vacancies">Vacancies</label>
        <select id="vacancies" value={formData.vacancies} onChange={handleChange}>
          <option value="">Select...</option>
          <option value="1">1</option>
          <option value="2-5">2-5</option>
          <option value="5+">5+</option>
        </select>

        <label htmlFor="jobLevel">Job Level</label>
        <select id="jobLevel" value={formData.jobLevel} onChange={handleChange}>
          <option value="">Select...</option>
          <option value="entry">Entry</option>
          <option value="mid">Mid</option>
          <option value="senior">Senior</option>
        </select>

        <br /><br />
        <label htmlFor="country">Country</label>
        <select id="country" value={formData.country} onChange={handleChange}>
          <option value="">Select...</option>
          <option value="India">India</option>
          <option value="USA">USA</option>
          <option value="Germany">Germany</option>
        </select>

        <label htmlFor="city">City</label>
        <select id="city" value={formData.city} onChange={handleChange}>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Delhi">Delhi</option>
        </select>

        <label htmlFor="desc">Job Description</label>
        <div
          id="desc"
          className="rich-editor"
          contentEditable="true"
          ref={editorRef}
          data-placeholder="Add your description..."
        ></div>

        <div className="desc-toolbar">
          <div className="toolbar-group">
            <select onChange={(e) => applyCommand("fontSize", e.target.value)}>
              <option value="2">14</option>
              <option value="3">16</option>
              <option value="4">18</option>
              <option value="5">20</option>
            </select>

            <input
              type="color"
              title="Choose text color"
              onChange={(e) => applyCommand("foreColor", e.target.value)}
            />

            <button type="button" onClick={() => applyCommand("bold")}>B</button>
            <button type="button" onClick={() => applyCommand("italic")}>I</button>
            <button type="button" onClick={() => applyCommand("underline")}>U</button>
            <button type="button" onClick={() => applyCommand("strikeThrough")}>S</button>
          </div>

          <div className="toolbar-group">
            <button type="button" onClick={() => applyCommand("justifyLeft")}>⇤</button>
            <button type="button" onClick={() => applyCommand("justifyCenter")}>↔</button>
            <button type="button" onClick={() => applyCommand("justifyRight")}>⇥</button>
          </div>

          <div className="toolbar-group">
            <button type="button" onClick={() => applyCommand("insertOrderedList")}>1.</button>
            <button type="button" onClick={() => applyCommand("insertUnorderedList")}>•</button>
          </div>

          <div className="toolbar-group">
            <button type="button" onClick={() => applyCommand("insertImage", prompt("Enter image URL"))}>🖼</button>
            <button type="button" onClick={() => applyCommand("createLink", prompt("Enter link URL"))}>🔗</button>
          </div>
        </div>

        <button type="submit" className="post-button">Post Job</button>
      </form>
    </div>
  );
};

export default Employee;
