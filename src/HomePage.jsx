import React from 'react'
import NavBar from './NavBar'
import Footer from './Footer'

const HomePage = () => {
  return (
    <div>
        <NavBar />
        <hero>

        </hero>
        <div>
          <h1>Featured Jobs</h1>
          <p>Choose jobs from the top employees and apply for the same</p>
        </div>
          <div className='job-card'>
            <h2>Job Title</h2>
            <p>Company Name</p>
            <p>Location</p>
            <button>Apply Now</button>
          </div>
          <div>
            <p>Top Companies hiring now</p>
          </div>
          <Footer />
        
    </div>
  )
}

export default HomePage