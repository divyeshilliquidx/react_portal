// Header.js
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import logolight from './assets/images/logo-light.png';
import logosm from './assets/images/logo-sm.png';
import user1 from './assets/images/users/user-1.jpg';
import { logout } from '../actions/userActions';

const Header = () => {
  const dispatch = useDispatch();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate('');

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const handleLogout = () => {
    console.log('logout');
    // Add any additional logout logic if needed
    // ...
    // Navigate to the login page
    dispatch(logout(''));
    navigate('/login');
    closeDropdown();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar-custom">
      <ul className="list-unstyled topnav-menu float-right mb-0">
        <li className="dropdown notification-list">
          <a
            className="nav-link dropdown-toggle nav-user mr-0 waves-effect waves-light"
            onClick={toggleDropdown}
            role="button"
            aria-haspopup="false"
            aria-expanded={isDropdownOpen}
          >
            <img src={user1} alt="user-image" className="rounded-circle" />
            <span className="pro-user-name ml-1">
              Geneva <i className="mdi mdi-chevron-down" />
            </span>
          </a>
          <div
            ref={dropdownRef}
            className={`dropdown-menu dropdown-menu-right profile-dropdown ${isDropdownOpen ? 'show' : ''
              }`}
          >

            <div className="dropdown-header noti-title">
              <h6 className="text-overflow m-0">Welcome !</h6>
            </div>
            {/* <Link to="/dashboard/contact-list">Contact List</Link> */}
            <Link to={`/dashboard/user-profile/3`} className="dropdown-item notify-item"> <i className="fe-user" /><span>My Account</span></Link>
            <div className="dropdown-divider"></div>
            <Link to="/login" className="dropdown-item notify-item" onClick={handleLogout}><i className="fe-log-out" /><span>Logout</span></Link>
          </div>
        </li>
      </ul>
      {/* LOGO */}
      <div className="logo-box">
        <Link to={`/dashboard/`} className="logo text-center"> <span className="logo-lg">
          <img src={logolight} alt="" height={18} />
        </span>
          <span className="logo-sm">
            <img src={logosm} alt="" height={24} />
          </span>
        </Link>

      </div>
    </div>
    // <header>
    //   <h1>My App</h1>
    //   <nav>
    //     <Link to="/dashboard">Dashboard</Link>
    //   </nav>
    // </header>
  );
};

export default Header;
