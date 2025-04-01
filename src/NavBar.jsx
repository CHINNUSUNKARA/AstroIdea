import React from 'react';
import './css/NavBar.css';
import { useNavigate, useLocation } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleButtonClick = () => {
    if (location.pathname === '/LoginPage') {
      navigate('/SignUpPage'); // Navigate to Signup page
    } else {
      navigate('/LoginPage'); // Navigate to Login page
    }
  };

  return (
    <div>
      <nav>
        <div>
          <img src="/public/vite.svg" alt="logo" />
        </div>
        <ol className="list">
          <li><a href="/">Home</a></li>
          <li><a href="/Jobs">Find Jobs</a></li>
          <li><a href="/Employers">Employers</a></li>
          <li><a href="/Admin">Admin</a></li>
          <li><a href="/About Us">About Us</a></li>
        </ol>
        <div>
          <button>Contact us</button>
          <button onClick={handleButtonClick}>
            {location.pathname === '/LoginPage' ? 'Signup' : 'Login'}
          </button>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;