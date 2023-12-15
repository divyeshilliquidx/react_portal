import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [contactActive, setContactActive] = useState(false);
  const [ticketActive, setTicketActive] = useState(false);

  const toggleContactActive = () => {
    setContactActive(!contactActive);
    setTicketActive(false);
  };

  const toggleTicketActive = () => {
    setTicketActive(!ticketActive);
    setContactActive(false);
  };

  return (
    <>
      <div className="left-side-menu">
        <div className="slimScrollDiv" style={{ position: 'relative', overflow: 'hidden', width: 'auto', height: '239.6px' }}>
          <div className="slimscroll-menu" style={{ overflow: 'hidden', width: 'auto', height: '239.6px' }}>
            {/* Sidemenu */}
            <div id="sidebar-menu" className="active">
              <ul className="metismenu in" id="side-menu">
                <li className="menu-title">Menu</li>

                <li>
                  <Link to="/dashboard"><i className="dripicons-meter" /><span>Dashboard</span></Link>
                </li>

                {/* Contact Start */}
                <li className={contactActive ? 'active' : ''}>
                  <a onClick={toggleContactActive}>
                    <i className="icon-user" />
                    <span> Contact </span>
                    <span className="menu-arrow" />
                  </a>
                  <ul className={`nav-second-level collapse ${contactActive ? 'in' : ''}`} aria-expanded={contactActive}>
                    <li>
                      <Link to="/dashboard/contact-list">Contact List</Link>
                    </li>
                  </ul>
                </li>
                {/* Contact End */}
                {/* Ticket Start */}
                <li className={ticketActive ? 'active' : ''}>
                  <a onClick={toggleTicketActive}>
                    <i className="dripicons-ticket" />
                    <span> Tickets </span>
                    <span className="menu-arrow" />
                  </a>
                  <ul className={`nav-second-level collapse ${ticketActive ? 'in' : ''}`} aria-expanded={ticketActive}>
                    <li>
                      <Link to="/dashboard/helpdesk-list">Ticket List</Link>
                    </li>
                  </ul>
                </li>
                {/* Ticket End */}
              </ul>
            </div>
            {/* End Sidebar */}
            <div className="clearfix" />
          </div>
          <div className="slimScrollBar" style={{ background: 'rgb(158, 165, 171)', width: '8px', position: 'absolute', top: '-355.875px', opacity: '0.4', display: 'none', borderRadius: '7px', zIndex: 99, right: '1px', height: '44.0247px' }} />
          <div className="slimScrollRail" style={{ width: '8px', height: '100%', position: 'absolute', top: '0px', display: 'none', borderRadius: '7px', background: 'rgb(51, 51, 51)', opacity: '0.2', zIndex: 90, right: '1px' }} />
        </div>
        {/* Sidebar -left */}
      </div>
    </>
  );
};

export default Sidebar;
