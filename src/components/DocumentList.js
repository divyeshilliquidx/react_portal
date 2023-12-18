// ContactList.js
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setHelpDeskData } from '../actions/helpDeskActions';
import Pagination from './Pagination';
import DocumentSummary from './DocumentSummary';
import ExportData from './ExportData'; // Adjust the path

//import user8 from '../components/assets/images/users/user-8.jpg';
//import user4 from '../components/assets/images/users/user-4.jpg';
import './Common.css';
import './assets/libs/custombox/custombox.min.css';
import './assets/css/bootstrap.min.css';
import './assets/css/icons.min.css';
import './assets/css/app.min.css';

const DocumentList = () => {

  const user_id = process.env.REACT_APP_USERID;
  const user_name = process.env.REACT_APP_USERNAME;
  const user_password = process.env.REACT_APP_USERPASSWORD;

  const [isModalOpen, setModalOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [selectedTicket, setSelectedTicket] = useState(null);
  const navigate = useNavigate('');
  const [formData, setFormData] = useState({
    ticket_title: '',
    ticketstatus: '',
    ticketpriorities: '',
  });
  
  // const [helpDeskData, setHelpDeskData] = useState([]); //old code
  // const [currentPage, setCurrentPage] = useState(1); //old code
  // const [totalPages, setTotalPages] = useState(1); //old code

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setFormData({
      ticket_title: '',
      ticketstatus: '',
      ticketpriorities: '',
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
    if (!formData.ticket_title.trim()) {
      errors.ticket_title = 'This field is required';
    }
    if (!formData.ticketstatus.trim()) {
      errors.ticketstatus = 'This field is required';
    }
    if (!formData.ticketpriorities.trim()) {
      errors.ticketpriorities = 'This field is required';
    }
    // if (!formData.email.trim()) {
    //   errors.email = 'Email is required';
    // } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    //   errors.email = 'Invalid email format';
    // }
    // if (!formData.phone.trim()) {
    //   errors.phone = 'Phone is required';
    // }
    // if (!formData.location.trim()) {
    //   errors.location = 'Location is required';
    // }
    return errors;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      // Form is valid, perform save logic here
      // console.log('Form data:', formData);
      // closeModal();

      try {
        // Example of save API endpoint (replace with your actual API)
        const saveResponse = await fetch('http://localhost:3000/saveRecord', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            module: "HelpDesk",
            values: {
              "ticket_title": formData.ticket_title,
              "ticketstatus": formData.ticketstatus,
              "ticketpriorities": formData.ticketpriorities,
              //"assigned_user_id": "19x1"
            },
            username: user_name,
            password: user_password
          }),
        });

        if (saveResponse.ok) {
          const saveData = await saveResponse.json();
          var ticketIdString = saveData.result.record.id;
          var ticketId = ticketIdString.split('x')[1];
          navigate(`/dashboard/helpdesk-detail/${ticketId}`);
          // Optionally, you can redirect the user or perform additional actions after successful update
        } else {
          console.error('Error updating ticket');
        }
      } catch (error) {
        console.error('Error updating ticket', error);
      }
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

  const fetchHelpDeskData = async (searchtype, page = 1) => {
    try {

      const searchField = document.getElementById('search_fieldname');
      const selectedOption = searchField.options[searchField.selectedIndex];
      const searchValue = document.getElementById('search_value').value;

      const response = await fetch(`http://localhost:3000/fetchReferenceRecords`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          module: 'HelpDesk',
          page,
          search_params: [[[selectedOption.value, searchtype, searchValue]]],
          crmid: 0,
          contactid: user_id,
        }),
      });

      if (response.ok) {
        const data = await response.json();

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

  const handleSearch = () => {
    const searchField = document.getElementById('search_fieldname');
    const selectedOption = searchField.options[searchField.selectedIndex];
    const searchtype = selectedOption.getAttribute('data-searchtype');

    fetchHelpDeskData(searchtype, 1);
  };

  useEffect(() => {
    fetchHelpDeskData();
  }, []); // Fetch data on component mount

  const handlePageChange = (newPage) => {
    const searchField = document.getElementById('search_fieldname');
    const selectedOption = searchField.options[searchField.selectedIndex];
    const searchtype = selectedOption.getAttribute('data-searchtype');

    fetchHelpDeskData(searchtype, newPage);
  };


  

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
          contactid: user_id,
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

  // Headers for CSV file
  const headers = [
    { label: 'Title', key: 'title' },
    { label: 'Status', key: 'status' },
    { label: 'Priority', key: 'priority' },
    // Add more headers as needed
  ];

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
                        <form action='#' className="form-inline">
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
                              <option value="ticketstatus" data-searchtype="equel">
                                Status
                              </option>
                              <option value="ticketpriorities" data-searchtype="equel">
                                Priority
                              </option>
                              <option value="ticketseverities" data-searchtype="equel">
                                Severity
                              </option>
                              <option value="ticketcategories" data-searchtype="equel">
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
                              onKeyUp={handleSearch}
                            />
                            <button
                              type="button"
                              className="btn btn-success waves-effect waves-light"
                              onClick={handleSearch}
                            >
                              Search
                            </button>
                            <button type="button" className="btn btn-success waves-effect waves-light" style={{ marginLeft: 5 }}>
                              <ExportData data={helpDeskData} headers={headers} filename="Tickets.csv" />
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
                </div>
              </div>
              <div className="col-xl-4">
                {selectedTicket ? (
                  <DocumentSummary ticket={selectedTicket} />
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
          </div>
        </div>
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
                  <label>Ticket Name<span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className={`form-control ${formErrors.ticket_title ? 'is-invalid' : ''}`}
                    id="ticket_title"
                    name="ticket_title"
                    placeholder="Enter name"
                    value={formData.ticket_title}
                    onChange={handleInputChange}
                  />
                  {formErrors.ticket_title && <div className="invalid-feedback">{formErrors.ticket_title}</div>}
                </div>

                <div className="form-group">
                  <label>Status<span className="text-danger">*</span></label>
                  <select
                    name="ticketstatus"
                    className={`form-control ${formErrors.ticketstatus ? 'is-invalid' : ''}`}
                    id="ticketstatus"
                    value={formData.ticketstatus}
                    onChange={handleInputChange}
                  >
                    <option value="">Select an Option</option>
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Wait For Response">Wait For Response</option>
                    <option value="Closed">Closed</option>
                  </select>
                  {formErrors.ticketstatus && <div className="invalid-feedback">{formErrors.ticketstatus}</div>}
                </div>
                <div className="form-group">
                  <label>Priority<span className="text-danger">*</span></label>
                  <select
                    name="ticketpriorities"
                    className={`form-control ${formErrors.ticketpriorities ? 'is-invalid' : ''}`}
                    id="ticketpriorities"
                    value={formData.ticketpriorities}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select an Option</option>
                    <option value="Low">Low</option>
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                  {formErrors.ticketpriorities && <div className="invalid-feedback">{formErrors.ticketpriorities}</div>}
                </div>
                {/* <div className="form-group">
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
                </div> */}
                {/* <div className="form-group">
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
                </div> */}
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

export default DocumentList;
