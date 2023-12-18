// ContactList.js
import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate, useHistory } from 'react-router-dom';
import user4 from '../components/assets/images/users/user-4.jpg';
import './Common.css';


const ChangePassword = () => {
  // var { id } = useParams();
  // const navigate = useNavigate('');
  // const [formData, setFormData] = useState({
  //   new_password: '',
  //   conform_password: '',
  //   email: '',
  // });

  // const [formErrors, setFormErrors] = useState({});
  // const [userProfile, setUserProfile] = useState({
  //   new_password: '',
  //   conform_password: '',
  //   email: '',
  //   // Add other properties as needed
  // });

  // useEffect(() => {
  //   // Fetch user profile when the component mounts
  //   fetchUserProfile();
  // }, []);

  // const fetchUserProfile = async () => {
  //   try {
  //     const contactId = id; // Replace with your logic to get the contact ID
  //     const response = await fetch(`http://localhost:3000/fetchUserProfile?contactid=${contactId}`);
  //     if (response.ok) {
  //       const userProfileData = await response.json();
  //       const userProfileResult = userProfileData.result;
  //       setUserProfile(userProfileResult);

  //       // Assuming the response structure is like { new_password: 'John', conform_password: 'Doe', email: 'john.doe@example.com' }
  //       setFormData({
  //         new_password: userProfileResult.new_password,
  //         conform_password: userProfileResult.conform_password,
  //         email: userProfileResult.email,
  //       });
  //     } else {
  //       console.error('Error fetching user profile');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching user profile', error);
  //   }
  // };

  // const validateForm = () => {
  //   let errors = {};

  //   if (!formData.new_password.trim()) {
  //     errors.new_password = 'First Name is required';
  //   }

  //   if (!formData.conform_password.trim()) {
  //     errors.conform_password = 'Last Name is required';
  //   }

  //   if (!formData.email.trim()) {
  //     errors.email = 'Email is required';
  //   } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
  //     errors.email = 'Invalid email format';
  //   }

  //   return errors;
  // };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  //   // Clear the specific field error when user starts typing
  //   setFormErrors({
  //     ...formErrors,
  //     [name]: '',
  //   });
  // };

  // const handleFormSubmit = async (e) => {
  //   e.preventDefault();
  //   const errors = validateForm();

  //   if (Object.keys(errors).length === 0) {
  //     // Form is valid, perform save logic here
  //     try {
  //       const saveResponse = await saveRecord(formData);
  //       if (saveResponse.ok) {
  //         console.log('User profile saved successfully');
  //         // Optionally, fetch the updated profile after saving
  //         fetchUserProfile();
  //         navigate(`/dashboard/user-profile/${id}`);
  //       } else {
  //         console.error('Error saving user profile');
  //       }
  //     } catch (error) {
  //       console.error('Error saving user profile', error);
  //     }
  //   } else {
  //     setFormErrors(errors);
  //   }
  // };

  // const saveRecord = async (data) => {
  //   try {
  //     const contactId = id;
  //     const saveResponse = await fetch('http://localhost:3000/saveRecord', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         module: "Contacts",
  //         values: {
  //           "new_password": data.new_password,
  //           "conform_password": data.conform_password,
  //           "email": data.email,
  //           //"assigned_user_id": "19x1"
  //         },
  //         recordId: "12x" + contactId,
  //         username: "chothani@illiquidx.com",
  //         password: "Admin@123"
  //       }),
  //     });

  //     // const saveResponse = await fetch('http://your-api-url/saveProfile', {
  //     //   method: 'POST',
  //     //   headers: {
  //     //     'Content-Type': 'application/json',
  //     //   },
  //     //   body: JSON.stringify(data),
  //     // });

  //     return saveResponse;
  //   } catch (error) {
  //     console.error('Error saving record', error);
  //   }
  // };
  return (
    <>
      <div className="content-page">
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box">
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a href="#">UBold</a>
                      </li>
                      <li className="breadcrumb-item active">Change Password</li>
                    </ol>
                  </div>
                  <h4 className="page-title">Change Password</h4>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-xl-6">
                <div className="card-box">
                  <ul className="nav nav-pills navtab-bg nav-justified">
                    <li className="nav-item">
                      <a
                        href="#settings"
                        data-toggle="tab"
                        aria-expanded="false"
                        className="nav-link active show"
                      >
                        Change Password
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content">
                    <div className="tab-pane active show" id="settings">
                      <form>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="new_password">New Password</label>
                              <input
                                type="password"
                                className="form-control "
                                id="new_password"
                                name="new_password"
                                placeholder="Enter New Password"
                                defaultValue=""
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="conform_password">
                                Conform Password
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                type="password"
                                className="form-control "
                                id="conform_password"
                                name="conform_password"
                                placeholder="Enter Confirm Password"
                                defaultValue=""
                              />
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <button
                            type="submit"
                            className="btn btn-success waves-effect waves-light mt-2"
                          >
                            <i className="mdi mdi-content-save" /> Update
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default ChangePassword;
