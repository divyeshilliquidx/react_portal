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
