import React from 'react'
import './css/Footer.css'
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'; 

const Footer = () => {
  return (
    <div>
        <footer>
            <div className='footer-container'>
              <div>
                <div>
                  <img src="../public/logo.png" alt="" />
                </div>
                <div>
                  <h6 style={{marginBottom:"15px"}}>Call now : +91 7989193795</h6>
                  <pre>201, Capital Pk Rd,above Cafe Southern,<br />
                    Cyber Hills Colony, VIP Hills, Silicon Valley,<br />
                    Madhapur, Hyderabad, Telangana 500081</pre>

                </div>
              </div>
              <div className='quick-links'>
                <div>
                <h4>Quick Links</h4>
                <ol>
                  <li>About</li>
                  <li>Contact</li>
                  <li>Admin</li>
                </ol>
                </div>
              
              <div>
                <h4>Candidate</h4>
                <ol>
                  <li>Browse jobs</li>
                  <li>browse Employes</li>
                  <li>Candidate Dashboard</li>
                  <li>Saved Jobs</li>
                </ol>
              </div>
              <div>
                <h4>Employers</h4>
                <ol>
                  <li>Post a job</li>
                  <li>Browse Candidates</li>
                  <li>Employers Dashboard</li>
                  <li>Appilications</li>
                </ol>
              </div>
              </div>
            </div>
            <div>
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