// DocumentSummary.js
import React from 'react';
import { Link } from 'react-router-dom';

const DocumentSummary = ({ document }) => {
    const crm_url = process.env.REACT_APP_CRMURL;
    return (
        <div className="card-box">
            <div className="media mb-3">
                <div className="media-body">
                    <h4 className="mt-0 mb-1">{document.note_no}</h4>
                </div>
            </div>
            <h5 className="mb-3 mt-4 text-uppercase bg-light p-2">
                <i className="mdi mdi-account-circle mr-1" /> Summary View
            </h5>
            <div className="">
                <h4 className="font-14 mb-1">
                    Title:
                </h4>
                <p className="mb-3">{document.title}</p>

                <h4 className="font-14 mb-1">
                    File Name:
                </h4>
                <p className="mb-3">{document.filename}</p>

                <h4 className="font-14 mb-1">
                    Download File:
                </h4>
                <p className="mb-3"><Link to={`${crm_url}/${document.path}${document.attachmentsid}_${document.storedname}`} target="_blank" download>{document.filename}</Link></p>
            </div>
        </div>
    );
};

export default DocumentSummary;
