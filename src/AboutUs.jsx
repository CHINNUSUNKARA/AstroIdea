import React from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import './css/About.css';

const AboutUs = () => {
  return (
    <div>
        <NavBar />
        <div className='card' style={{ display: 'flex', flexDirection: 'column', justifyItems:"center",alignItems: 'center', marginTop: '100px' }}>
            <div className='card-body' >
                <h5 className='card-title'>About Us</h5>
                <br />
                <br />
                <p className='card-text'>
                <b>AstroIdea</b> Softway is a vibrant community of tech-savvy individuals who believe in the power of technology to shape a better and more connected world. We are driven by innovation, creativity, and a shared vision for a future where technology is accessible, efficient, and impactful.
                    </p>
                    <p className='card-text'>
                    AstroIdea Softway is more than just an IT company—we are a digital innovation hub. Our team is composed of passionate developers,
                     designers, analysts, and strategists who bring ideas to life through technology..</p>

        </div>
    </div>
    <div className='card1' style={{ display: 'flex', flexDirection: 'column', justifyItems:"center",alignItems: 'center', marginTop: '100px' }}>
            <div className='card-body' >
                <img id='img1' src="http://localhost:5173/home-hero-image.png" alt="img" />
                <div className='para1'>
                  <p>
                  <b>🚀 Our Vision</b> <br /> <br />
                  To become a globally recognized leader in IT services by delivering intelligent, scalable, and future-ready solutions that empower businesses and communities alike.
                  </p>
                  <br />
                  <br />
                  <p>
                  <b>🎯 Our Mission</b> <br /> <br />

                  To provide forward-thinking IT solutions that adapt to the ever-evolving global market.

                  To help businesses embrace digital transformation through custom software, web, and mobile applications.

                  To foster a culture of continuous learning, collaboration, and technical excellence.
                  </p>
                  <p>
                    <br />
                    <br />
                  <b>🌟 Who We Are</b> <br />
                  <br />
                  AstroIdea Softway is more than just an IT company—we are a digital innovation hub. Our team is composed of passionate
                   developers, designers, analysts, and strategists who bring ideas to life through technology.
                  </p>
                </div>
                
        </div>
        <div className='card2'>
          <h1><u>Company Overview</u></h1>  <br />
          <br />
          <p>
          We want to be a leading technology solutions provider, delivering advanced solutions and exceptional customer support to help businesses thrive in the evolving technological landscape
          </p>
          <br />
          <br />
          <p>We are committed to delivering value to our customers by providing cutting-edge and user-friendly software solutions, technical support, and customer experience management, consistently exceeding their expectations and helping them reach their goals.

          </p>
          <br />
          <br />
          <p ><b><i>Values that drive us</i></b></p>
          <br /> 
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
          <p> <i class="fa-solid fa-circle-check"></i>We adopt flexible delivery mechanisms to adapt with your business requirements</p> <br />
          <p><i class="fa-solid fa-circle-check"></i>Fostering enduring relationships through service delight and shared commitments</p> <br />
          <p><i class="fa-solid fa-circle-check"></i>We listen and collaborate thus creating common goals for “Best in class delivery”</p> <br /> <br /> <br />
          <p>AstroIdea Softway capability to support L1, L2, and L3provide customers with a comprehensive and efficient approach to resolving technical issues, from basic to complex, on time.</p>
        </div> <br /> <br /> <br /> <br /> <br /> <br /><br /> <br />
        
        <div className='card3'>
        <h1><u>Our services</u></h1>
        <br />
        <br /> <br /> <br />

        <div className='services'>
          <h1 id='hh1'>Support Services</h1>
          <h1 id='hh2'>Staffing services</h1>
          <h1 id='hh3'>Time and Material basis(T&M)</h1>
          <h1 id='hh4'>Custom Software Development</h1>
          <h1 id='hh5'>Requirement Analysis</h1>
          <h1 id='hh6'>Design and development</h1>

        </div>

        </div>
        </div>
        <br /> <br /> <br /> <br /> <br /> <br /> <br />
        <Footer />
    </div>

  )
}

export default AboutUs