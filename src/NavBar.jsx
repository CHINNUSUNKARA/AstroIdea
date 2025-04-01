import React from 'react'
import './css/NavBar.css'

const NavBar = () => {
  return (
    <div>
        <nav> <div> <img src="/public/vite.svg" alt="logo" />
         </div> 
         <div> 
            <ol className='list'>
             <li><a href="/home">Home</a></li>
              <li><a href="/Jobs">Find Jobs</a></li> 
              <li><a href="/Employers">Employers</a></li>
               <li><a href="/Admin">Admin</a></li> 
               <li><a href="/About Us">About Us</a></li>
                </ol>
                 </div> 
                 <div> 
                    <button>Contact us</button> 
                    <button>Login</button> 
                    </div>
                     </nav> 
    </div>
  )
}

export default NavBar