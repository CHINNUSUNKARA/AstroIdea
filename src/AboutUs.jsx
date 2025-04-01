import React from 'react'
import NavBar from './NavBar'

const AboutUs = () => {
  return (
    <div>
        <NavBar />
        <div className='card' style={{ display: 'flex', flexDirection: 'column', justifyItems:"center",alignItems: 'center', marginTop: '100px' }}>
            <div className='card-body' style={{textAlign:"center"}}>
                <h5 className='card-title'>About Us</h5>
                <p className='card-text'>
                    This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured
                    content or information.
                    </p>
                    <p className='card-text'>
                        It uses utility classes for typography and spacing to space content out within the larger
                        container.</p>

        </div>
    </div>
    </div>

  )
}

export default AboutUs