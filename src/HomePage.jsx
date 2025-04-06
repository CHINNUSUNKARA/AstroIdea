import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import './css/HomePage.css'; // Assuming you have a CSS file for styling

const HomePage = () => {
  return (
    <div>
      <NavBar />
      <div className="hero-page">
        <div className="hero-page-content">
          <div className="hero-page-text">
            <h4>Find a job that aligns with your interests and skills</h4>
            <p className='hero-main-p'>Thousands of jobs in all leading sectors are waiting for you</p>

            <div className="search-card">
            <div class="search-inputs">
              <input type="text" class="input-field-hero" placeholder="Search job title..." />
              <div class="input-divider"></div>
              <input type="text" class="input-field-hero" placeholder="Location..." />
              <button>Find Job</button>
            </div>

            </div>
            <p className="suggestion">
                <span>Suggestion:</span> UI/UX Designers, Programming, <span>Digital Marketing</span>, Video Animation
              </p>
          </div>

          <div className="hero-page-image">
            <img src="/home-hero-image.png" alt="hero" />
          </div>
        </div>
      </div>

      <div className="featured-jobs">
        <h1>Featured Jobs</h1>
        <p>Choose jobs from top employers and apply for the same.</p>

        <div className="job-card">
          <h2>Frontend Developer</h2>
          <p>Google Inc.</p>
          <p>Mountain View, CA</p>
          <button>Apply Now</button>
        </div>
        {/* You can map job cards dynamically later */}
      </div>

      <div className="top-companies">
      <div className="section-heading">
          <h2>Top Companies hiring Now</h2>
        </div>         
         <div className="logo-slider">
            <div className="logo-track">
              <img src="../public/User Assests/Logos/google-logo.png" alt="Google" />
              <img src="../public/User Assests/Logos/Icrosoft-logo.png" alt="Microsoft" />
              <img src="../public/User Assests/Logos/Amazon-logo.png" alt="Amazon" />
              <img src="../public/User Assests/Logos/Apple-log0.png" alt="Apple" />
              <img src="../public/User Assests/Logos/Facebook-logo.jpg" alt="Facebook" />
              <img src="../public/User Assests/Logos/Netflix-logo.png" alt="Netflix" />
              <img src="../public/User Assests/Logos/Adobe-logo.png" alt="Adobe" />
              <img src="../public/User Assests/Logos/LinkedinLogo.png" alt="LinkedIn" />
              <img src="../public/User Assests/Logos/Airbnb-logo.png" alt="Airbnb" />


              <img src="../public/User Assests/Logos/google-logo.png" alt="Google" />
              <img src="../public/User Assests/Logos/Icrosoft-logo.png" alt="Microsoft" />
              <img src="../public/User Assests/Logos/Amazon-logo.png" alt="Amazon" />
              <img src="../public/User Assests/Logos/Apple-log0.png" alt="Apple" />
              <img src="../public/User Assests/Logos/Facebook-logo.jpg" alt="Facebook" />
              <img src="../public/User Assests/Logos/Netflix-logo.png" alt="Netflix" />
              <img src="../public/User Assests/Logos/Adobe-logo.png" alt="Adobe" />
              <img src="../public/User Assests/Logos/LinkedinLogo.png" alt="LinkedIn" />
              <img src="../public/User Assests/Logos/Airbnb-logo.png" alt="Airbnb" />
            </div>
          </div> 
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
