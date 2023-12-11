// MainContent.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ContactList from './ContactList';

const MainContent = () => {
  return (
    <div>
      <Routes>
        <Route path="contact-list" element={<ContactList />} />
        {/* Add more routes as needed */}
      </Routes>
    </div>
  );
};

export default MainContent;
