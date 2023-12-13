import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { format12HourTime, USDCurrencyFormat, formatNumber } from '../helper';
import { setHelpDeskData } from '../actions/helpDeskActions';

const HelpDeskDetail = () => {
    const { id } = useParams();
    const [ticket, setTicket] = useState(null);
    console.log(setHelpDeskData)
    useEffect(() => {
        const fetchTicketDetails = async () => {
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
                        crmid: id,
                        contactid: 3,
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    setTicket(data.result[0]);
                } else {
                    console.error('Error fetching ticket details');
                }
            } catch (error) {
                console.error('Error fetching ticket details', error);
            }
        };

        fetchTicketDetails();
    }, [id]);

    return (
        <>
            {ticket && (
                <div className="content-page">
                    <div className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12">
                                    <div className="page-title-box">
                                        <div className="page-title-right">
                                            <ol className="breadcrumb m-0">
                                                <li className="breadcrumb-item">
                                                    <a href="#">Ticket</a>
                                                </li>
                                                <li className="breadcrumb-item">
                                                    <Link to="/dashboard/helpdesk-list">All Tickets</Link>
                                                </li>
                                                <li className="breadcrumb-item active">{ticket.ticket_no}</li>
                                            </ol>
                                        </div>
                                        <h4 className="page-title">{ticket.ticket_no}</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="card col-lg-12">
                                    <div className="detailview-content container-fluid" style={{}}>
                                        <div className="block">
                                            <div>
                                                <h4 className="textOverflowEllipsis maxWidth50">&nbsp;Ticket Details</h4>
                                            </div>
                                            <hr style={{ borderBottom: "1px solid" }} />
                                            <div className="blockData">
                                                <table className="table" style={{ border: "none" }}>
                                                    <colgroup>
                                                        <col className="col-md-3" />
                                                        <col className="col-md-3" />
                                                        <col className="col-md-3" />
                                                        <col className="col-md-3" />
                                                    </colgroup>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <b>Title</b>
                                                            </td>
                                                            <td>{ticket.title}</td>
                                                            <td>
                                                                <b>Status</b>
                                                            </td>
                                                            <td>{ticket.status}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <b>Priority</b>
                                                            </td>
                                                            <td>{ticket.priority}</td>
                                                            <td>
                                                                <b>Createdtime</b>
                                                            </td>
                                                            <td>{format12HourTime(ticket.createdtime)}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <b>Severity</b>
                                                            </td>
                                                            <td>{ticket.severity}</td>
                                                            <td>
                                                                <b>Category</b>
                                                            </td>
                                                            <td>{ticket.category}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <b>Hours</b>
                                                            </td>
                                                            <td>{ticket.hours}</td>
                                                            <td>
                                                                <b>Days</b>
                                                            </td>
                                                            <td>{ticket.days}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <b>Currency</b>
                                                            </td>
                                                            <td>{USDCurrencyFormat(123456798.54541)}</td>
                                                            <td>
                                                                <b>Days</b>
                                                            </td>
                                                            <td>{ticket.days}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <br />
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

export default HelpDeskDetail;
