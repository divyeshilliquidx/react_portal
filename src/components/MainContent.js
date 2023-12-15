// MainContent.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ContactList from './ContactList';
import HelpDeskList from './HelpDeskList';
import HelpDeskDetail from './HelpDeskDetail';
import HelpDeskEdit from './HelpDeskEdit';
import UserProfile from './UserProfile';

const MainContent = () => {
  return (
    <div>
      <Routes>
        <Route path="contact-list" element={<ContactList />} />
        <Route path="helpdesk-list" element={<HelpDeskList />} />
        <Route path="helpdesk-detail/:id" element={<HelpDeskDetail />} />
        <Route path="helpdesk-edit/:id" element={<HelpDeskEdit />} />
        <Route path="user-profile/:id" element={<UserProfile />} />
        {/* Add more routes as needed */}
      </Routes>
    </div>
  );
};

export default MainContent;
