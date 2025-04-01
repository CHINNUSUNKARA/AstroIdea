import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google'; // Import GoogleOAuthProvider
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import AdminDashboard from './Admin/AdminDashboard'

const App = () => {
  return (
    <div>
      {/* Wrap your app with GoogleOAuthProvider and pass the clientId */}
      <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/SignUpPage" element={<SignUpPage />} /> 
            <Route path='/AdminPage' element={<AdminDashboard />}   />       
          </Routes>
        </Router>
      </GoogleOAuthProvider>
    </div>
  );
};

export default App;
