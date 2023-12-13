// ContactList.js
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setHelpDeskData } from '../actions/helpDeskActions';
import Pagination from './Pagination';
import HelpDeskSummary from './HelpDeskSummary';

//import user8 from '../components/assets/images/users/user-8.jpg';
//import user4 from '../components/assets/images/users/user-4.jpg';
import './ContactList.css';
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
  // const [helpDeskData, setHelpDeskData] = useState([]); //old code
  // const [currentPage, setCurrentPage] = useState(1); //old code
  // const [totalPages, setTotalPages] = useState(1); //old code

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

  //Old code  start
  // const fetchHelpDeskData = async (page = 1) => {
  //   try {
  //     const response = await fetch(`http://localhost:3000/fetchReferenceRecords`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         module: 'HelpDesk',
  //         page,
  //         search_params: [[]],
  //         crmid: 0,
  //         contactid: 3,
  //       }),
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       setHelpDeskData(data.result);
  //       setCurrentPage(page);
  //       setTotalPages(64);
  //     } else {
  //       console.error('Error fetching help desk data');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching help desk data', error);
  //   }
  // };
  //Old Code end

  const fetchHelpDeskData = async (page = 1) => {
    try {

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
      // Perform your API fetch here...
      //const response = await fetch(`http://localhost:3000/fetchHelpDeskData?page=${page}`);
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

  // Pagination code
  // const getPageNumbers = () => {
  //   const pageRange = 2;
  //   const startPage = Math.max(1, currentPage - pageRange);
  //   const endPage = Math.min(totalPages, currentPage + pageRange);

  //   return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  // };

  const [selectedTicket, setSelectedTicket] = useState(null);

  const handleViewClick = async (ticketid) => {
    try {
      const response = await fetch(`http://localhost:3000/fetchReferenceRecords`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          module: 'HelpDesk',
          page: 1,
          search_params: [[]],
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
                      <div className="col-sm-4">
                        <form className="form-inline">
                          <div className="form-group mb-2">
                            <label htmlFor="inputPassword2" className="sr-only">
                              Search
                            </label>
                            <input
                              type="search"
                              className="form-control"
                              id="inputPassword2"
                              placeholder="Search..."
                            />
                          </div>
                        </form>
                      </div>
                      <div className="col-sm-8">
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
                                  <i class="fa fa-list-alt" aria-hidden="true"></i>
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
                    {/* <ul className="pagination pagination-rounded justify-content-end mb-0 mt-2">
                      <li className="page-item">
                        <a
                          className="page-link"
                          href="#"
                          aria-label="Previous"
                        >
                          <span aria-hidden="true">«</span>
                          <span className="sr-only">Previous</span>
                        </a>
                      </li>
                      <li className="page-item active">
                        <a className="page-link" href="#">
                          1
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          2
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          3
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          4
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#">
                          5
                        </a>
                      </li>
                      <li className="page-item">
                        <a
                          className="page-link"
                          href="#"
                          aria-label="Next"
                        >
                          <span aria-hidden="true">»</span>
                          <span className="sr-only">Next</span>
                        </a>
                      </li>
                    </ul> */}

                    {/* <ul className="pagination pagination-rounded justify-content-end mb-0 mt-2">
                      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(currentPage - 1)}
                        >
                          Previous
                        </button>
                      </li>
                      {[...Array(totalPages).keys()].map((page) => (
                        <li key={page + 1} className={`page-item ${currentPage === page + 1 ? 'active' : ''}`}>
                          <button
                            className="page-link"
                            onClick={() => handlePageChange(page + 1)}
                          >
                            {page + 1}
                          </button>
                        </li>
                      ))}
                      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(currentPage + 1)}
                        >
                          Next
                        </button>
                      </li>
                    </ul> */}

                    {/* <ul className="pagination pagination-rounded justify-content-end mb-0 mt-2">
                      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(currentPage - 1)}
                        >
                          Previous
                        </button>
                      </li>
                      {getPageNumbers().map((page) => (
                        <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                          <button
                            className="page-link"
                            onClick={() => handlePageChange(page)}
                          >
                            {page}
                          </button>
                        </li>
                      ))}
                      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button
                          className="page-link"
                          onClick={() => handlePageChange(currentPage + 1)}
                        >
                          Next
                        </button>
                      </li>
                    </ul> */}

                    <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
                  </div>
                  {/* end card-body*/}
                </div>
                {/* end card*/}
              </div>
              {/* end col */}
              {/* <div className="col-xl-4">
                <div className="card-box">
                  <div className="media mb-3">
                    <div className="media-body">
                      <h4 className="mt-0 mb-1">Ticket1</h4>
                    </div>
                  </div>
                  <h5 className="mb-3 mt-4 text-uppercase bg-light p-2">
                    <i className="mdi mdi-account-circle mr-1" /> Summary View
                  </h5>
                  <div className="">
                    <h4 className="font-13 text-muted text-uppercase mb-1">
                      Ticket :
                    </h4>
                    <p className="mb-3">Ticket1</p>

                    <h4 className="font-13 text-muted text-uppercase mb-1">
                      Status :
                    </h4>
                    <p className="mb-3">Closed</p>

                    <h4 className="font-13 text-muted text-uppercase mb-1">
                      Priority :
                    </h4>
                    <p className="mb-3">High</p>
                  </div>
                </div>
              </div> */}
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
