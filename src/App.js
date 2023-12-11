// App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import MainContent from './components/MainContent';

const App = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    // <BrowserRouter>
    <div>
      <Header />
      {user ? (
        <div>
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
    </div>
    // </BrowserRouter>
  );
};

export default App;
