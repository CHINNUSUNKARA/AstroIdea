import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/SignUpPage.css';
import NavBar from './NavBar';
import { useState } from 'react';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const navigate = useNavigate();
  


  const handleRegister = async (e) => {
    e.preventDefault();
  
    // Simple frontend validation
    if (!name || !email || !password || !mobile) {
      alert("Please fill in all required fields.");
      return;
    }
  
    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          mobile, 
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('User registered:', data);
        alert('Registration successful!');
        navigate('/LoginPage');
      } else {
        const error = await response.json();
        alert(`Registration failed: ${error.message}`);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('An error occurred. Please try again.');
    }
  };
  
  

  return (
    <div className="sign-up-page">
      <NavBar />
      <div className="sign-up-container">
        <h4 className="sign-up-title">Registration form</h4>
        <p className="sign-up-subtitle">Register to apply for jobs of your choice all over the world</p>
        <section>
        <form className="sign-up-form">
          <label htmlFor="f-name">Full name <span style={{color:"red"}}>*</span></label>
          <input className="form-input" id='f-name' type="text"
            placeholder="Enter your full name" required
            value={name} onChange={(e) => setName(e.target.value)} />          
          <label htmlFor="email">Email ID <span style={{color:"red"}}>*</span></label>
          <input className="form-input" id='email' type="email"
            placeholder="Enter your email id" required
            value={email} onChange={(e) => setEmail(e.target.value)} />
          <p className="form-note">Job notifications will be sent to this email id</p>
          <label htmlFor="password">Password <span style={{color:"red"}}>*</span></label>
          <input className="form-input" id='password' type="password"
            placeholder="(Minimum 6 characters)" required
            value={password} onChange={(e) => setPassword(e.target.value)} />          
          <p className="form-note">Remember your password</p>
          <label htmlFor="mobile">Mobile number <span style={{color:"red"}}>*</span></label>
          <input className="form-input" id='mobile' type="tel"
            placeholder="Enter your Mobile number" required
            value={mobile} onChange={(e) => setMobile(e.target.value)} />          
          <p className="form-note">Recruiters will contact you on this number</p>
          <div className="checkbox-section">
          <label>
            <input type="checkbox" required />
            <span>Send me important updates & promotions via SMS, email, and <img src="../public/User Assests/Logos/whatsapp-logo.png" width="20px"/> WhatsApp</span>
          </label> 
        </div>


          <p className="terms-text">
            By clicking Register, you agree to the <a href="#">Terms and Conditions</a> & <a href="#">Privacy Policy</a> of AlwaysApply.com
          </p>

          <button className="register-button" onClick={handleRegister}>
            Register now
          </button>
        </form>

        <div className="social-login">
              <p className="or-login-with">or login with</p>
              <div className="social-buttons">
                <button className="google-button">
                  <img src="../public/googlr logo.png" alt="Google Logo" />
                </button>
                <button className="facebook-button">
                  <img src="../public/Facebook-logo.jpg" alt="Facebook Logo" />
                </button>
                <button className="linkedin-button">
                  <img src="../public/LinkedinLogo.png" alt="LinkedIn Logo" />
                </button>
              </div>
            </div>
        </section>
      </div>
    </div>
  );
};

export default SignUpPage;
