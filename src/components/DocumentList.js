// ContactList.js
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setDocumentData } from '../actions/documentActions';
import Pagination from './Pagination';
import DocumentSummary from './DocumentSummary';
import ExportData from './ExportData'; // Adjust the path
import DownloadLink from 'react-download-link';

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
  const crm_url = process.env.REACT_APP_CRMURL;

  const [isModalOpen, setModalOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [selectedDocument, setSelectedDocument] = useState(null);
  const navigate = useNavigate('');
  const [formData, setFormData] = useState({
    document_title: '',
    filename: '',
    // documentpriorities: '',
  });

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setFormData({
      document_title: '',
      filename: '',
      // documentpriorities: '',
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
    if (!formData.document_title.trim()) {
      errors.document_title = 'This field is required';
    }
    if (!formData.filename.trim()) {
      errors.filename = 'This field is required';
    }
    return errors;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      try {

        const formData = new FormData();
        formData.append('module', 'Documents');
        formData.append('values[notes_title]', formData.document_title);
        formData.append('file', document.getElementById('filename').files[0]);
        formData.append('username', user_name);
        formData.append('password', user_password);

        const saveResponse = await fetch('http://localhost:3000/saveRecord', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        // Example of save API endpoint (replace with your actual API)
        // const saveResponse = await fetch('http://localhost:3000/saveRecord', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({
        //     module: "Documents",
        //     values: {
        //       "notes_title": formData.document_title,
        //     },
        //     filename: formData.document_title,
        //     file: formData.filename,
        //     username: user_name,
        //     password: user_password
        //   }),
        // });

        if (saveResponse.ok) {
          const saveData = await saveResponse.json();
          var documentIdString = saveData.result.record.id;
          var documentId = documentIdString.split('x')[1];
          navigate(`/dashboard/document-detail/${documentId}`);
          // Optionally, you can redirect the user or perform additional actions after successful update
        } else {
          console.error('Error updating document');
        }
      } catch (error) {
        console.error('Error updating document', error);
      }
    } else {
      setFormErrors(errors);
    }
  };

  //new code start
  const dispatch = useDispatch();
  const documentState = useSelector((state) => state.document);
  const { documentData, currentPage, totalPages } = documentState;
  //new end

  const fetchDocumentData = async (searchtype, page = 1) => {
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
          module: 'Documents',
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
          setDocumentData({
            data: data.result,
            currentPage: page,
            totalPages: 5, // Assuming totalPages is fixed in your case
          })
        );
      }
      // Perform your API fetch here...
      //const response = await fetch(`http://localhost:3000/fetchDocumentData?page=${page}`);
    } catch (error) {
      console.error('Error fetching help desk data', error);
    }
  };

  const handleSearch = () => {
    const searchField = document.getElementById('search_fieldname');
    const selectedOption = searchField.options[searchField.selectedIndex];
    const searchtype = selectedOption.getAttribute('data-searchtype');

    fetchDocumentData(searchtype, 1);
  };

  useEffect(() => {
    fetchDocumentData();
  }, []); // Fetch data on component mount

  const handlePageChange = (newPage) => {
    const searchField = document.getElementById('search_fieldname');
    const selectedOption = searchField.options[searchField.selectedIndex];
    const searchtype = selectedOption.getAttribute('data-searchtype');

    fetchDocumentData(searchtype, newPage);
  };

  const handleViewClick = async (notesid) => {
    try {
      const response = await fetch(`http://localhost:3000/fetchReferenceRecords`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          module: 'Documents',
          page: 1,
          search_params: [[]],
          crmid: notesid,
          contactid: user_id,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSelectedDocument(data.result[0]);
      } else {
        console.error('Error fetching document details');
      }
    } catch (error) {
      console.error('Error fetching document details', error);
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
                      <li className="breadcrumb-item active">Documents</li>
                    </ol>
                  </div>
                  <h4 className="page-title">Documents</h4>
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
                              <option value="notes_title" data-searchtype="like">
                                Document Name
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
                              <ExportData data={documentData} headers={headers} filename="Documents.csv" />
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
                            <i className="mdi mdi-plus-circle mr-1" /> Add Document
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
                            <th>Filename</th>
                            <th style={{ width: 130 }}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {documentData.map((document) => (
                            <tr key={document.notesid}>
                              <td>{document.title}</td>
                              <td><Link to={`${crm_url}/${document.path}${document.attachmentsid}_${document.storedname}`} target="_blank" download>{document.filename}</Link></td>
                              <td>
                                <Link className="action-icon" to={`/dashboard/document-edit/${document.notesid}`}>
                                  <i className="mdi mdi-square-edit-outline" />
                                </Link>
                                <Link className="action-icon" to={`/dashboard/document-detail/${document.notesid}`}>
                                  <i className="mdi mdi-eye" />
                                </Link>
                                {/* <Link className="action-icon" to={`/document-detail/${document.notesid}`}><i className="mdi mdi-eye" /></Link> */}
                                <a href="#" className="action-icon" onClick={() => handleViewClick(document.notesid)}>
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
                {selectedDocument ? (
                  <DocumentSummary document={selectedDocument} />
                ) : (
                  <div className="card-box">
                    {/* Initial content when no document is selected */}
                    <h5 className="mb-3 mt-4 text-uppercase bg-light p-2">
                      <i className="mdi mdi-account-circle mr-1" /> Summary View
                    </h5>
                    <p>Please select a document to view details.</p>
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
            <h4 className="custom-modal-title">Add Documents</h4>
            <div className="custom-modal-text text-left">
              {/* Your modal content goes here */}
              <form>
                <div className="form-group">
                  <label>Document Name<span className="text-danger">*</span></label>
                  <input
                    type="text"
                    className={`form-control ${formErrors.document_title ? 'is-invalid' : ''}`}
                    id="document_title"
                    name="document_title"
                    placeholder="Enter name"
                    value={formData.document_title}
                    onChange={handleInputChange}
                  />
                  {formErrors.document_title && <div className="invalid-feedback">{formErrors.document_title}</div>}
                </div>

                <div className="form-group">
                  <label>File Upload<span className="text-danger">*</span></label>
                  <input
                    type="file"
                    id="filename"
                    name="filename"
                    className={`form-control ${formErrors.filename ? 'is-invalid' : ''}`}
                    onChange={handleInputChange}
                  />
                  {formErrors.filename && <div className="invalid-feedback">{formErrors.filename}</div>}
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

export default DocumentList;
