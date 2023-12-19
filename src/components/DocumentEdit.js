import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate, useHistory } from 'react-router-dom';
import { format12HourTime, USDCurrencyFormat, formatNumber } from '../helper';

const DocumentEdit = () => {

    const user_id = process.env.REACT_APP_USERID;
    const user_name = process.env.REACT_APP_USERNAME;
    const user_password = process.env.REACT_APP_USERPASSWORD;
    const crm_url = process.env.REACT_APP_CRMURL;

    const { id } = useParams();
    const navigate = useNavigate('');
    // const history = useHistory();

    const [documentdata, setDocument] = useState({
        title: '',
        storedname: '',
    });

    useEffect(() => {
        const fetchDocumentEdit = async () => {
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
                        crmid: id,
                        contactid: user_id,
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    setDocument(data.result[0]);
                } else {
                    console.error('Error fetching  details');
                }
            } catch (error) {
                console.error('Error fetching  details', error);
            }
        };

        fetchDocumentEdit();
    }, [id]);

    const handleInputChange = (event) => {
        const { name, value, files } = event.target;

        setDocument((prevDocument) => ({
            ...prevDocument,
            [name]: files ? files[0] : value, // If files exist, it's a file input, otherwise, it's a regular input
        }));
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        // Validate the form
        const form = event.target;
        if (!form.checkValidity()) {
            // If the form is not valid, do not submit
            return;
        }

        try {
            const postData = new FormData();
            postData.append('module', 'Documents');
            postData.append('values', JSON.stringify({ notes_title: documentdata.title }));
            postData.append('file', document.getElementById('storedname').files[0]);
            postData.append('filename', documentdata.title);
            postData.append('username', user_name);
            postData.append('password', user_password);
            postData.append('recordId', '15x' + id);

            const saveResponse = await fetch('http://localhost:3000/saveRecord', {
                method: 'POST',
                body: postData,
            });

            if (saveResponse.ok) {
                const saveData = await saveResponse.json();
                var documentIdString = saveData.result.record.id;
                var documentId = documentIdString.split('x')[1];
                navigate(`/dashboard/document-detail/${documentId}`);
            } else {
                console.error('Error updating document');
            }
        } catch (error) {
            console.error('Error updating document', error);
        }
    };

    const picklists = {
        priority: ['Low', 'Normal', 'High', 'Urgent'],
        ticket_status: ['Open', 'In Progress', 'Wait For Response', 'Closed'],
        severity: ['Minor', 'Major', 'Feature', 'Critical'],
        category: ['Big Problem', 'Small Problem', 'Other Problem'],
        assigned_to: {
            users: [
                { value: '1', text: 'Divyesh Administrator' },
                { value: '7', text: 'alex d' },
                { value: '5', text: 'Hill Scott' },
                { value: '6', text: 'Rahul Patel' },
            ],
            groups: [
                { value: '3', text: 'Marketing Group' },
                { value: '4', text: 'Support Group' },
                { value: '2', text: 'Team Selling' },
            ],
        },
    };

    const handleCancel = () => {
        navigate(`/dashboard/document-list`);
    };

    return (
        <>
            {documentdata && (
                <div className="content-page">
                    <div className="content">
                        <div className="container-fluid">
                            <div className="row">
                                {/* ... (other code) */}
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="card-box">
                                        <form role="form" className="parsley-examples" noValidate="" onSubmit={handleFormSubmit}>
                                            <div className="form-group row">
                                                <label className="col-4 col-form-label">
                                                    Title<span className="text-danger">*</span>
                                                </label>
                                                <div className="col-7">
                                                    <input
                                                        type="text"
                                                        required
                                                        className="form-control"
                                                        id="title"
                                                        name="title"
                                                        value={documentdata.title || ''}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-4 col-form-label">
                                                    Upload Document
                                                </label>
                                                <div className="col-7">
                                                    <input
                                                        type="file"
                                                        id="storedname"
                                                        name="storedname"
                                                        className="form-control"
                                                        onChange={(e) => handleInputChange(e)}
                                                    />
                                                    {documentdata.storedname && <span>{documentdata.storedname.name}</span>}
                                                    <a href={`${crm_url}/${documentdata.path}${documentdata.attachmentsid}_${documentdata.storedname}`}>{documentdata.filename}</a>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <div className="col-8 offset-4">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary waves-effect waves-light" style={{ marginRight: 10 }}
                                                    >
                                                        Save
                                                    </button>
                                                    <button
                                                        type="reset"
                                                        className="btn btn-secondary waves-effect m-l-5" onClick={handleCancel}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DocumentEdit;
