import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import './css/HomePage.css'; // Assuming you have a CSS file for styling

const HomePage = () => {
  return (
    <div>
      <NavBar />

      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h4>Find a job that aligns with your interests and skills</h4>
            <p>Thousands of jobs in all leading sectors are waiting for you</p>

            <div className="search-card">
              <h1>Search for your dream job</h1>
              <div className="search-inputs">
                <input type="text" placeholder="Job title, keywords..." />
                <input type="text" placeholder="Location..." />
                <button>Find Job</button>
              </div>
              <p className="suggestion">
                <span>Suggestion:</span> UI/UX Designers, Programming, <span>Digital Marketing</span>, Video Animation
              </p>
            </div>
          </div>

          <div className="hero-image">
            <img src="/home-hero-image.png" alt="hero" />
          </div>
        </div>
      </section>

      <section className="featured-jobs">
        <h1>Featured Jobs</h1>
        <p>Choose jobs from top employers and apply now</p>

        <div className="job-card">
          <h2>Frontend Developer</h2>
          <p>Google Inc.</p>
          <p>Mountain View, CA</p>
          <button>Apply Now</button>
        </div>
        {/* You can map job cards dynamically later */}
      </section>

      <section className="top-companies">
        <h2>Top Companies Hiring Now</h2>
        {/* You can dynamically load company logos/cards here */}
        <p>[Company cards or logos go here]</p>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
