import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {

  const [activeMenu, setActiveMenu] = useState(null);

  const handleMenuClick = (menuName) => {
    setActiveMenu((prevMenu) => (prevMenu === menuName ? null : menuName));
  };

  // const [contactActive, setContactActive] = useState(false);
  // const [ticketActive, setTicketActive] = useState(false);
  // const [documentActive, setDocumentActive] = useState(false);

  // const toggleContactActive = () => {
  //   setContactActive(!contactActive);
  //   setTicketActive(false);
  //   setDocumentActive(false);
  // };

  // const toggleTicketActive = () => {
  //   setContactActive(false);
  //   setTicketActive(!ticketActive);
  //   setDocumentActive(false);
  // };

  // const toggleDocumentActive = () => {
  //   setDocumentActive(!documentActive);
  //   setContactActive(false);
  //   setTicketActive(false);
  // };

  return (
    <>
      <div className="left-side-menu">
        <div className="slimScrollDiv" style={{ position: 'relative', overflow: 'hidden', width: 'auto', height: 'auto' }}>
          <div className="slimscroll-menu" style={{ overflow: 'hidden', width: 'auto', height: 'auto' }}>
            {/* Sidemenu */}
            <div id="sidebar-menu" className="active">
              <ul className="metismenu in" id="side-menu">
                <li className="menu-title">Menu</li>

                <li>
                  <Link to="/dashboard"><i className="dripicons-meter" /><span>Dashboard</span></Link>
                </li>

                {/* Contact Start */}
                <li className={activeMenu === 'contact' ? 'active' : ''}>
                  <a onClick={() => handleMenuClick('contact')}>
                    <i className="icon-user" />
                    <span> Contact </span>
                    <span className="menu-arrow" />
                  </a>
                  <ul className={`nav-second-level collapse ${activeMenu === 'contact' ? 'in' : ''}`} aria-expanded={activeMenu === 'contact'}>
                    <li>
                      <Link to="/dashboard/contact-list">Contact List</Link>
                    </li>
                  </ul>
                </li>
                {/* Contact End */}

                {/* Ticket Start */}
                <li className={activeMenu === 'ticket' ? 'active' : ''}>
                  <a onClick={() => handleMenuClick('ticket')}>
                    <i className="dripicons-ticket" />
                    <span> Tickets </span>
                    <span className="menu-arrow" />
                  </a>
                  <ul className={`nav-second-level collapse ${activeMenu === 'ticket' ? 'in' : ''}`} aria-expanded={activeMenu === 'ticket'}>
                    <li>
                      <Link to="/dashboard/helpdesk-list">Ticket List</Link>
                    </li>
                  </ul>
                </li>
                {/* Ticket End */}

                {/* Documents Start */}
                <li className={activeMenu === 'document' ? 'active' : ''}>
                  <a onClick={() => handleMenuClick('document')}>
                    <i className="dripicons-document" />
                    <span> Documents </span>
                    <span className="menu-arrow" />
                  </a>
                  <ul className={`nav-second-level collapse ${activeMenu === 'document' ? 'in' : ''}`} aria-expanded={activeMenu === 'document'}>
                    <li>
                      <Link to="/dashboard/document-list">Document List</Link>
                    </li>
                  </ul>
                </li>
                {/* Documents End */}
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
