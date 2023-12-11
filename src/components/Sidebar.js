// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside>
      <h2>Sidebar Component</h2>
      <nav>
        <Link to="/dashboard/contact-list">Contact List</Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
