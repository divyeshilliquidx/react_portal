import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setHelpDeskData } from '../actions/helpDeskActions';
import Pagination from './Pagination';
import HelpDeskSummary from './HelpDeskSummary';

import './Common.css';
import './assets/libs/custombox/custombox.min.css';
import './assets/css/bootstrap.min.css';
import './assets/css/icons.min.css';
import './assets/css/app.min.css';

const HelpDeskList = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
  });
  const [formErrors, setFormErrors] = useState({});

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      location: '',
    });
    setFormErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear the specific field error when user starts typing
    setFormErrors({
      ...formErrors,
      [name]: '',
    });
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Phone is required';
    }
    if (!formData.location.trim()) {
      errors.location = 'Location is required';
    }
    return errors;
  };

  const handleSave = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      // Form is valid, perform save logic here
      console.log('Form data:', formData);
      closeModal();
    } else {
      setFormErrors(errors);
    }
  };

  //new code start
  const dispatch = useDispatch();
  const helpDeskState = useSelector((state) => state.helpDesk);
  const { helpDeskData, currentPage, totalPages } = helpDeskState;
  //new end

const handleSearch = () => {
    const searchField = document.getElementById('search_fieldname');
    const selectedOption = searchField.options[searchField.selectedIndex];
    const searchtype = selectedOption.getAttribute('data-searchtype');

    // Now you have the dynamic searchtype based on the selected field
    // You can use this searchtype in your API request
    fetchHelpDeskData(searchtype);
  };
  const fetchHelpDeskData = async (searchtype, page = 1) => {
    try {
      const { search_fieldname, search_value } = searchParams;
      const response = await fetch(`http://localhost:3000/fetchReferenceRecords`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          module: 'HelpDesk',
          page,
          search_params: [[]],
          crmid: 0,
          contactid: 3,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Fetched Help Desk Data:', data);
        // Dispatch the action to update the Redux state
        dispatch(
          setHelpDeskData({
            data: data.result,
            currentPage: page,
            totalPages: 5, // Assuming totalPages is fixed in your case
          })
        );
      }
    } catch (error) {
      console.error('Error fetching help desk data', error);
    }
  };

  useEffect(() => {
    fetchHelpDeskData();
  }, []); // Fetch data on component mount

  const handlePageChange = (newPage) => {
    fetchHelpDeskData(newPage);
  };

  const [selectedTicket, setSelectedTicket] = useState(null);

  const handleViewClick = async (ticketid) => {
    try {
      const search_value = '';
      const search_fieldname = '';
      const searchtype = '';
      const response = await fetch(`http://localhost:3000/fetchReferenceRecords`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          module: 'HelpDesk',
          page: 1,
          search_params: [[[search_fieldname, searchtype, search_value]]],
          crmid: ticketid,
          contactid: 3,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSelectedTicket(data.result[0]);
      } else {
        console.error('Error fetching ticket details');
      }
    } catch (error) {
      console.error('Error fetching ticket details', error);
    }
  };

  return (
    <>
      <div className="content-page">
        <div className="content">
          {/* Start Content*/}
          <div className="container-fluid">
            {/* start page title */}
            <div className="row">
              <div className="col-12">
                <div className="page-title-box">
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="#">UBold</a>
                      </li>
                      <li className="breadcrumb-item">
                        <a href="#">CRM</a>
                      </li>
                      <li className="breadcrumb-item active">Tickets</li>
                    </ol>
                  </div>
                  <h4 className="page-title">Tickets</h4>
                </div>
              </div>
            </div>
            {/* end page title */}
            <div className="row">
              <div className="col-xl-8">
                <div className="card">
                  <div className="card-body">
                    <div className="row mb-2">
                      <div className="col-sm-10">
                        <form className="form-inline">
                          <div className="form-group mb-2 col-sm-12">
                            <select
                              name="search_fieldname"
                              id="search_fieldname"
                              className="form-control col-sm-4"
                              style={{ marginRight: 7 }}
                            >
                              <option value="ticket_title" data-searchtype="like">
                                Ticket Name
                              </option>
                              <option value="ticketstatus" data-searchtype="equal">
                                Status
                              </option>
                              <option value="ticketpriorities" data-searchtype="equal">
                                Priority
                              </option>
                              <option value="ticketseverities" data-searchtype="equal">
                                Severity
                              </option>
                              <option value="ticketcategories" data-searchtype="equal">
                                Category
                              </option>
                            </select>
                            <input
                              type="search"
                              className="form-control"
                              placeholder="Search..."
                              name="search_value"
                              id="search_value"
                              style={{ marginRight: 5 }}
                            />
                            <button
                              type="button"
                              className="btn btn-success waves-effect waves-light"
                              onClick={handleSearch}
                            >
                              Search
                            </button>
                          </div>
                        </form>
                      </div>


                      <div className="col-sm-2">
                        <div className="text-sm-right">
                          <button
                            type="button"
                            className="btn btn-danger waves-effect waves-light mb-2"
                            onClick={openModal}
                          >
                            <i className="mdi mdi-plus-circle mr-1" /> Add Ticket
                          </button>
                        </div>
                      </div>
                      {/* end col*/}
                    </div>

                    <div className="table-responsive">
                      <table className="table table-centered table-hover mb-0" style={{ tableLayout: "fixed" }}>
                        <thead>
                          <tr>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Priority</th>
                            <th style={{ width: 130 }}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {helpDeskData.map((ticket) => (
                            <tr key={ticket.ticketid}>
                              <td>{ticket.title}</td>
                              <td>{ticket.status}</td>
                              <td>{ticket.priority}</td>
                              <td>
                                <Link className="action-icon" to={`/dashboard/helpdesk-edit/${ticket.ticketid}`}>
                                  <i className="mdi mdi-square-edit-outline" />
                                </Link>
                                <Link className="action-icon" to={`/dashboard/helpdesk-detail/${ticket.ticketid}`}>
                                  <i className="mdi mdi-eye" />
                                </Link>
                                {/* <Link className="action-icon" to={`/helpdesk-detail/${ticket.ticketid}`}><i className="mdi mdi-eye" /></Link> */}
                                <a href="#" className="action-icon" onClick={() => handleViewClick(ticket.ticketid)}>
                                  <i className="fa fa-list-alt" aria-hidden="true"></i>
                                </a>
                                <a href="#" className="action-icon">
                                  <i className="mdi mdi-delete" />
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
                  </div>
                  {/* end card-body*/}
                </div>
              </div>
              <div className="col-xl-4">
                {selectedTicket ? (
                  <HelpDeskSummary ticket={selectedTicket} />
                ) : (
                  <div className="card-box">
                    {/* Initial content when no ticket is selected */}
                    <h5 className="mb-3 mt-4 text-uppercase bg-light p-2">
                      <i className="mdi mdi-account-circle mr-1" /> Summary View
                    </h5>
                    <p>Please select a ticket to view details.</p>
                  </div>
                )}
              </div>
            </div>
            {/* end row */}
          </div>
          {/* container */}
        </div>
        {/* content */}
      </div>
      {isModalOpen && (
        <div className="custombox-content custombox-x-center custombox-y-center custombox-fadein custombox-open">
          {/* Background overlay */}
          <div className="modal-overlay" onClick={closeModal} />
          <div id="custom-modal" className="modal-demo" style={{ display: 'block', top: 80 }}>
            <button type="button" className="close" onClick={closeModal}>
              <span>×</span>
              <span className="sr-only">Close</span>
            </button>
            <h4 className="custom-modal-title">Add Tickets</h4>
            <div className="custom-modal-text text-left">
              {/* Your modal content goes here */}
              <form>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className={`form-control ${formErrors.name ? 'is-invalid' : ''}`}
                    id="name"
                    name="name"
                    placeholder="Enter name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                  {formErrors.name && <div className="invalid-feedback">{formErrors.name}</div>}
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Email address</label>
                  <input
                    type="email"
                    className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                    id="email"
                    name="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
                </div>
                <div className="form-group">
                  <label htmlFor="position">Phone</label>
                  <input
                    type="text"
                    className={`form-control ${formErrors.phone ? 'is-invalid' : ''}`}
                    id="phone"
                    name="phone"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                  {formErrors.phone && <div className="invalid-feedback">{formErrors.phone}</div>}
                </div>
                <div className="form-group">
                  <label htmlFor="company">Location</label>
                  <input
                    type="text"
                    className={`form-control ${formErrors.location ? 'is-invalid' : ''}`}
                    id="location"
                    name="location"
                    placeholder="Enter location"
                    value={formData.location}
                    onChange={handleInputChange}
                  />
                  {formErrors.location && <div className="invalid-feedback">{formErrors.location}</div>}
                </div>
                <div className="text-right">
                  <button
                    type="submit"
                    className="btn btn-success waves-effect waves-light"
                    style={{ marginRight: 5 }}
                    onClick={handleSave}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger waves-effect waves-light m-l-10"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HelpDeskList;
