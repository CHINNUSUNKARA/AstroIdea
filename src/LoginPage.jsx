import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/LoginPage.css';
import NavBar from './NavBar';

const LoginPage = () => {
  const navigate = useNavigate();

  // States for email, password, and whether to show the password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const onSuccess = (response) => {
    console.log('Login Success:', response);
    // Handle successful login here
  };

  const onFailure = () => {
    console.log('Login Failed');
    // Handle login failure here
  };

  const handleSignUp = () => {
    console.log('Sign up clicked');
    navigate('/SignUpPage');
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <NavBar />
      <div className="Login-header">
      <h1 style={{textAlign:"left" ,margin:"0px"}}>Login to your Account</h1>
      <p >Welcome back! Select the below login methods.</p></div>
      <div className="Login-page-container">        
        <div className="Login-card">
          {/* Login Form Section */}
          <div className="login-form-container">
            <form className="Login-form">
              {/* Email Field */}
              <div className="form-group">
                <label htmlFor="email" className="Login-Email-Field">
                  Email ID / Username
                </label>
                <input
                  type="email"
                  id="email"
                  className="input-fields-mail"
                  placeholder="Enter email id/username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password Field with "Show" toggle */}
              <div className="form-group">
                <div className="password-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="input-fields-mail"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button 
                    type="button"
                    className="show-password-button"
                    onClick={toggleShowPassword}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Remember me & Forgot Password */}
              <div className="checkbox-container">
                <div className="remember-me-container">
                  <input type="checkbox" id="remember-me" />
                  <label htmlFor="remember-me">Remember me</label>
                </div>
                <a href="#" className="forgot-password">
                  Forgot Password?
                </a>
              </div>

              {/* Login Button */}
              <button type="button" className="Login-button">
                <strong>Login</strong>
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
            {/* Register Footer */}
            <div className="signup-footer">
              <p>
                Don't have an account? <a href="/SignUpPage">Register</a>
              </p>
            </div>
          </div>

          {/* Image Section */}
          <div className="login-illustration-container">
            <img
              src="../public/image.png"
              alt="Login Illustration"
              className="login-illustration"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
