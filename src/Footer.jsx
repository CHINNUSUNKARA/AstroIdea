import React from 'react'
import './css/Footer.css'
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'; 

const Footer = () => {
  return (
    <div>
         <footer className="footer">
      <div className="footer-container">
        {/* Logo and Address Section */}
        <div className="footer-logo-address">
          <img src="../public/logo.png" alt="Company Logo" className="footer-logo" />
          <h6>Call now: +91 7989193795</h6>
          <address>
            201, Capital Pk Rd, above Cafe Southern,<br />
            Cyber Hills Colony, VIP Hills, Silicon Valley,<br />
            Madhapur, Hyderabad, Telangana 500081
          </address>
        </div>

        {/* Links Sections */}
        <div className="footer-links">
          {/* Quick Links */}
          <div>
            <h4>Quick Links</h4>
            <ol>
              <li><a href="#">About</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Admin</a></li>
            </ol>
          </div>

          {/* Candidate Section */}
          <div>
            <h4>Candidate</h4>
            <ol>
              <li><a href="#">Browse Jobs</a></li>
              <li><a href="#">Browse Employers</a></li>
              <li><a href="#">Candidate Dashboard</a></li>
              <li><a href="#">Saved Jobs</a></li>
            </ol>
          </div>

          {/* Employers Section */}
          <div>
            <h4>Employers</h4>
            <ol>
              <li><a href="#">Post a Job</a></li>
              <li><a href="#">Browse Candidates</a></li>
              <li><a href="#">Employers Dashboard</a></li>
              <li><a href="#">Applications</a></li>
            </ol>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="footer-bottom">
              <p>&copy;2025,AstroideaSoftway-Job Portal.ALl rights Reserved</p>
              <div className="social-icons">
                <a href="#" className="icon">
                <FaFacebook />
                </a>
                <a href="#" className="icon">
                <FaInstagram />
                </a>
                <a href="#" className="icon">
                <FaTwitter />
                </a>
                <a href="#" className="icon">
                <FaYoutube />
                </a>
            </div>
            </div>
    </footer>
    </div>
  )
}

export default Footer