// MainContent.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ContactList from './ContactList';
import HelpDeskList from './HelpDeskList';

const MainContent = () => {
  return (
    <div>
      <Routes>
        <Route path="contact-list" element={<ContactList />} />
        <Route path="helpdesk-list" element={<HelpDeskList />} />
        {/* Add more routes as needed */}
      </Routes>
    </div>
  );
};

export default MainContent;
