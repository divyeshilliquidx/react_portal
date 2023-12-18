// App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import MainContent from './components/MainContent';

import './components/assets/libs/flatpickr/flatpickr.min.css';
import './components/assets/css/bootstrap.min.css';
import './components/assets/css/icons.min.css';
import './components/assets/css/app.min.css';
import HelpDeskList from './components/HelpDeskList';
import HelpDeskDetail from './components/HelpDeskDetail';
import HelpDeskEdit from './components/HelpDeskEdit';
import UserProfile from './components/UserProfile';
import ChangePassword from './components/ChangePassword';
import DocumentList from './components/DocumentList';
import DocumentDetail from './components/DocumentDetail';



const App = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  
  return (
    <BrowserRouter>
      {user ? (
        <div id="wrapper">
          <Header />
          <Sidebar />
          <Routes>
            <Route path="/dashboard/*" element={<MainContent />} />
            <Route path="dashboard/helpdesk-list" element={<HelpDeskList />} />
            <Route path="dashboard/helpdesk-detail/:id" element={<HelpDeskDetail />} />
            <Route path="dashboard/helpdesk-edit/:id" element={<HelpDeskEdit />} />
            <Route path="dashboard/user-profile/:id" element={<UserProfile />} />
            <Route path="dashboard/change-password/:id" element={<ChangePassword />} />
            <Route path="dashboard/document-list" element={<DocumentList />} />
            <Route path="dashboard/document-detail/:id" element={<DocumentDetail />} />
            <Route path="/*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
