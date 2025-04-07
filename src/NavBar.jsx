import React, { useState, useEffect } from 'react';
import './css/NavBar.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setIsLoggedIn(!!user);
  }, [location]);

  const handleButtonClick = () => {
    if (location.pathname === '/LoginPage') {
      navigate('/SignUpPage');
    } else {
      navigate('/LoginPage');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <img src="/logo.png" alt="logo" />
      </div>

      <ol className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/JobSearch">Find Jobs</a></li>
        <li><a href="/Employers">Employers</a></li>
        <li><a href="/AdminPage">Admin</a></li>
        <li><a href="/AboutUs">About Us</a></li>
      </ol>

      <div className="nav-buttons">
      <button style={{marginTop:"0px" }}>Contact us</button>

        {!isLoggedIn ? (
          <button style={{marginTop:"0px"}} onClick={handleButtonClick}>
            {location.pathname === '/LoginPage' ? 'Signup' : 'Login'}
          </button>
        ) : (
          <div className="profile-dropdown" >
            <FaUserCircle className="profile-icon" onClick={() => setShowDropdown(!showDropdown)} />
            {showDropdown && (
              <div className="dropdown-menu">
                <button style={{color:"#000"}} onClick={() => navigate('/complete-profile')}>Edit Profile</button>
                <button style={{color:"#000"}} onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;

