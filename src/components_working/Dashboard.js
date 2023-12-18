// src/components/Dashboard.js
import React from 'react';

const Dashboard = ({ user }) => {
    return (
        <div>
            <h2>Dashboard</h2>
            <p>Welcome, {user.username}!</p>
        </div>
    );
};

export default Dashboard;
