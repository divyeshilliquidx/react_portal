// DocumentSummary.js
import React from 'react';

const DocumentSummary = ({ ticket }) => {
    return (
        <div className="card-box">
            <div className="media mb-3">
                <div className="media-body">
                    <h4 className="mt-0 mb-1">{ticket.ticket_no}</h4>
                </div>
            </div>
            <h5 className="mb-3 mt-4 text-uppercase bg-light p-2">
                <i className="mdi mdi-account-circle mr-1" /> Summary View
            </h5>
            <div className="">
                <h4 className="font-14 mb-1">
                    Ticket:
                </h4>
                <p className="mb-3">{ticket.title}</p>

                <h4 className="font-14 mb-1">
                    Status:
                </h4>
                <p className="mb-3">{ticket.status}</p>

                <h4 className="font-14 mb-1">
                    Priority:
                </h4>
                <p className="mb-3">{ticket.priority}</p>
            </div>
        </div>
    );
};

export default DocumentSummary;
