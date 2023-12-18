// ContactList.js
import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate, useHistory } from 'react-router-dom';
import user4 from '../components/assets/images/users/user-4.jpg';
import './Common.css';


const UserProfile = () => {
  var { id } = useParams();
  const navigate = useNavigate('');
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [userProfile, setUserProfile] = useState({
    firstname: '',
    lastname: '',
    email: '',
    // Add other properties as needed
  });

  useEffect(() => {
    // Fetch user profile when the component mounts
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const contactId = id; // Replace with your logic to get the contact ID
      const response = await fetch(`http://localhost:3000/fetchUserProfile?contactid=${contactId}`);
      if (response.ok) {
        const userProfileData = await response.json();
        const userProfileResult = userProfileData.result;
        setUserProfile(userProfileResult);

        // Assuming the response structure is like { firstname: 'John', lastname: 'Doe', email: 'john.doe@example.com' }
        setFormData({
          firstname: userProfileResult.firstname,
          lastname: userProfileResult.lastname,
          email: userProfileResult.email,
        });
      } else {
        console.error('Error fetching user profile');
      }
    } catch (error) {
      console.error('Error fetching user profile', error);
    }
  };

  const validateForm = () => {
    let errors = {};

    if (!formData.firstname.trim()) {
      errors.firstname = 'First Name is required';
    }

    if (!formData.lastname.trim()) {
      errors.lastname = 'Last Name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }

    return errors;
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length === 0) {
      // Form is valid, perform save logic here
      try {
        const saveResponse = await saveRecord(formData);
        if (saveResponse.ok) {
          console.log('User profile saved successfully');
          // Optionally, fetch the updated profile after saving
          fetchUserProfile();
          navigate(`/dashboard/user-profile/${id}`);
        } else {
          console.error('Error saving user profile');
        }
      } catch (error) {
        console.error('Error saving user profile', error);
      }
    } else {
      setFormErrors(errors);
    }
  };

  const saveRecord = async (data) => {
    try {
      const contactId = id;
      const saveResponse = await fetch('http://localhost:3000/saveRecord', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          module: "Contacts",
          values: {
            "firstname": data.firstname,
            "lastname": data.lastname,
            "email": data.email,
            //"assigned_user_id": "19x1"
          },
          recordId: "12x" + contactId,
          username: "chothani@illiquidx.com",
          password: "Admin@123"
        }),
      });

      // const saveResponse = await fetch('http://your-api-url/saveProfile', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(data),
      // });

      return saveResponse;
    } catch (error) {
      console.error('Error saving record', error);
    }
  };
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
                      <li className="breadcrumb-item active">Profile</li>
                    </ol>
                  </div>
                  <h4 className="page-title">Profile</h4>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-8 col-xl-8">
                <div className="card-box">
                  <ul className="nav nav-pills navtab-bg nav-justified">
                    <li className="nav-item">
                      <a
                        href="#settings"
                        data-toggle="tab"
                        aria-expanded="false"
                        className="nav-link active show"
                      >
                        Personal Info
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content">
                    <div className="tab-pane active show" id="settings">
                      <form>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="firstname">First Name</label>
                              <input
                                type="text"
                                className={`form-control ${formErrors.firstname ? 'is-invalid' : ''}`}
                                id="firstname"
                                name="firstname"
                                placeholder="Enter first name"
                                value={formData.firstname}
                                onChange={handleInputChange}
                              />
                              {formErrors.firstname && <div className="invalid-feedback">{formErrors.firstname}</div>}
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="lastname">Last Name<span style={{ color: 'red' }}>*</span></label>
                              <input
                                type="text"
                                className={`form-control ${formErrors.lastname ? 'is-invalid' : ''}`}
                                id="lastname"
                                name="lastname"
                                placeholder="Enter last name"
                                value={formData.lastname}
                                onChange={handleInputChange}
                              />
                              {formErrors.lastname && <div className="invalid-feedback">{formErrors.lastname}</div>}
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>Email Address</label>
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
                          </div>
                        </div>
                        <div className="text-right">
                          <button
                            type="submit"
                            className="btn btn-success waves-effect waves-light mt-2"
                            onClick={handleFormSubmit}
                          >
                            <i className="mdi mdi-content-save" /> Update
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-xl-4">
                <div className="card-box text-center">
                  <img
                    src={user4}
                    className="rounded-circle avatar-lg img-thumbnail"
                    alt="profile-image"
                  />
                  <h4 className="mb-0">{userProfile.firstname} {userProfile.lastname}</h4>
                  <p className="text-muted">{userProfile.email}</p>
                  <div className="text-left mt-3">
                    <h4 className="font-13 text-uppercase">About Me :</h4>
                    <p className="text-muted font-13 mb-3">
                      Hi I'm {userProfile.title}.
                    </p>
                    <p className="text-muted mb-2 font-13">
                      <strong>First Name :</strong>
                      <span className="ml-2">{userProfile.firstname}</span>
                    </p>
                    <p className="text-muted mb-2 font-13">
                      <strong>Last Name :</strong>
                      <span className="ml-2">{userProfile.lastname}</span>
                    </p>
                    <p className="text-muted mb-2 font-13">
                      <strong>Mobile :</strong>
                      <span className="ml-2">{userProfile.mobile}</span>
                    </p>
                    <p className="text-muted mb-2 font-13">
                      <strong>Email :</strong>
                      <span className="ml-2 ">{userProfile.email}</span>
                    </p>
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

export default UserProfile;
