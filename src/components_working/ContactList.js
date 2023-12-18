// ContactList.js
import React, { useState, useEffect, useRef } from 'react';
import user8 from '../components/assets/images/users/user-8.jpg';
import user4 from '../components/assets/images/users/user-4.jpg';
import './Common.css';
import './assets/libs/custombox/custombox.min.css';
import './assets/css/bootstrap.min.css';
import './assets/css/icons.min.css';
import './assets/css/app.min.css';

const ContactList = () => {

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
                      <li className="breadcrumb-item active">Contacts</li>
                    </ol>
                  </div>
                  <h4 className="page-title">Contacts</h4>
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
                          {/* <button
                          type="button"
                          className="btn btn-success waves-effect waves-light mb-2 mr-1"
                        >
                          <i className="mdi mdi-settings" />
                        </button>
                        <a
                          href="#custom-modal"
                          className="btn btn-danger waves-effect waves-light mb-2"
                          data-animation="fadein"
                          data-plugin="custommodal"
                          data-overlaycolor="#38414a"
                        >
                          <i className="mdi mdi-plus-circle mr-1" /> Add Contact
                        </a> */}
                          <button
                            type="button"
                            className="btn btn-danger waves-effect waves-light mb-2"
                            onClick={openModal}
                          >
                            <i className="mdi mdi-plus-circle mr-1" /> Add Contact
                          </button>
                        </div>
                      </div>
                      {/* end col*/}
                    </div>
                    <div className="table-responsive">
                      <table className="table table-centered table-hover mb-0">
                        <thead>
                          <tr>
                            <th>Basic Info</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Company</th>
                            <th>Created Date</th>
                            <th style={{ width: 82 }}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="table-user">
                              <img
                                src={user4}
                                alt="table-user"
                                className="mr-2 rounded-circle"
                              />
                              <a
                                href="#"
                                className="text-body font-weight-semibold"
                              >
                                Paul J. Friend
                              </a>
                            </td>
                            <td>937-330-1634</td>
                            <td>pauljfrnd@jourrapide.com</td>
                            <td>Vine Corporation</td>
                            <td>07/07/2018</td>
                            <td>
                              <a href="#" className="action-icon">
                                <i className="mdi mdi-square-edit-outline" />
                              </a>
                              <a href="#" className="action-icon">
                                <i className="mdi mdi-delete" />
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <ul className="pagination pagination-rounded justify-content-end mb-0 mt-2">
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
                    </ul>
                  </div>
                  {/* end card-body*/}
                </div>
                {/* end card*/}
              </div>
              {/* end col */}
              <div className="col-xl-4">
                <div className="card-box">
                  <div className="media mb-3">
                    <img
                      className="d-flex mr-3 rounded-circle avatar-lg"
                      src={user8}
                      alt="Generic placeholder image"
                    />
                    <div className="media-body">
                      <h4 className="mt-0 mb-1">Jade M. Walker</h4>
                      <p className="text-muted">Branch manager</p>
                      <p className="text-muted">
                        <i className="mdi mdi-office-building" /> Vine Corporation
                      </p>
                      <a href="#" className="btn- btn-xs btn-info">
                        Send Email
                      </a>
                      <a
                        href="#"
                        className="btn- btn-xs btn-secondary"
                      >
                        Call
                      </a>
                      <a
                        href="#"
                        className="btn- btn-xs btn-secondary"
                      >
                        Edit
                      </a>
                    </div>
                  </div>
                  <h5 className="mb-3 mt-4 text-uppercase bg-light p-2">
                    <i className="mdi mdi-account-circle mr-1" /> Personal Information
                  </h5>
                  <div className="">
                    <h4 className="font-13 text-muted text-uppercase">About Me :</h4>
                    <p className="mb-3">
                      Hi I'm Johnathn Deo,has been the industry's standard dummy text
                      ever since the 1500s, when an unknown printer took a galley of
                      type.
                    </p>
                    <h4 className="font-13 text-muted text-uppercase mb-1">
                      Date of Birth :
                    </h4>
                    <p className="mb-3">March 23, 1984 (34 Years)</p>
                    <h4 className="font-13 text-muted text-uppercase mb-1">
                      Company :
                    </h4>
                    <p className="mb-3">Vine Corporation</p>
                    <h4 className="font-13 text-muted text-uppercase mb-1">
                      Added :
                    </h4>
                    <p className="mb-3">April 22, 2016</p>
                    <h4 className="font-13 text-muted text-uppercase mb-1">
                      Updated :
                    </h4>
                    <p className="mb-0">Dec 13, 2017</p>
                  </div>
                </div>
                {/* end card-box*/}
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
            <h4 className="custom-modal-title">Add Contacts</h4>
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

export default ContactList;
