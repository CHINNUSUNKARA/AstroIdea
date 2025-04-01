import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import './css/LoginPage.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();

  const onSuccess = (response) => {
    console.log('Login Success:', response);
    // Handle successful login here
  };

  const onFailure = (response) => {
    console.log('Login Failed:', response);
    // Handle login failure here
  };
  const handlesignup = () => {
    console.log('Sign up clicked');
    navigate('/SignUpPage')
    }
  return (
    <div className="login-page">
        <nav class="navbar">
            <img src="/public/vite.svg" alt="logo" class="logo" />
            <div class="social-icons">
                <i class="fab fa-facebook-f"></i>
                <i class="fab fa-twitter"></i>
                <i class="fab fa-instagram"></i>
            </div>
            <button class="signup-button" onClick={handlesignup}>Sign Up</button>
        </nav>

    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px' }}>
      <h1>Login Page</h1>
      <div className="card">
      <input type="email" placeholder='Enter Your Email Address' id='email' className='input-feilds-mail' />
      <input type="password" placeholder='Enter Your Password' id='password' className='input-feilds-mail'/>
      
      <GoogleLogin
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
      />
      </div>
    </div>
    </div>
  );
};

export default LoginPage;
