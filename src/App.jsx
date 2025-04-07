import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google'; // Import GoogleOAuthProvider
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import AdminDashboard from './Admin/AdminDashboard'
import NavBar from './NavBar';
import JobSearchApplication from './JobSearch';
import ProfileManagement from './ProfileManagement';
import ProfileEditing from './ProfileEditing';
import HomePage from './HomePage';
import AboutUs from './AboutUs';
import Employee from './Employee';

const App = () => {
  return (
    <div>
      {/* Wrap your app with GoogleOAuthProvider and pass the clientId */}
      <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
        <Router>
          <Routes>
            <Route path="/LoginPage" element={<LoginPage />} />
            <Route path="/SignUpPage" element={<SignUpPage />} /> 
            <Route path='/AdminPage' element={<AdminDashboard />}   />       
            <Route path='/NavBar' element={<NavBar />}   />       
            <Route path='/JobSearch' element={<JobSearchApplication />}   />       
            <Route path='/ProfileManage' element={<ProfileManagement />}   />       
            <Route path='/ProfileEdit' element={<ProfileEditing />}   />       
            <Route path='/' element={<HomePage />}   />       
            <Route path='/AboutUs' element={<AboutUs />}   />      
            <Route path='/Employers' element={<Employee />}   />   
            <Route path='/AboutUs' element={<AboutUs />}   />                


          </Routes>
        </Router>
      </GoogleOAuthProvider>
    </div>
  );
};

export default App;
