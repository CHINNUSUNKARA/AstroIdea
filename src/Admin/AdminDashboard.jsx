// src/components/AdminDashboard.js
import React from 'react';
import '../css/AdminDashboard.css';
import NavBar from '../NavBar';

const AdminDashboard = () => {
    return (
        <>
        <nav>
            <NavBar/>
            
        </nav>
        <div className="dashboard-container" style={{marginTop:"60px"}}>
            <h1 className="dashboard-heading">Admin Dashboard</h1>
            <div className="sections-container">



            </div>
        </div></>
    );
};

export default AdminDashboard;
