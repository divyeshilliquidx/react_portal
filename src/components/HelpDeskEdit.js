import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate, useHistory } from 'react-router-dom';
import { format12HourTime, USDCurrencyFormat, formatNumber } from '../helper';

const HelpDeskEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate('');
    // const history = useHistory();
    
    const [ticket, setTicket] = useState({
        title: '',
        priority: '',
        ticket_status: '',
        severity: '',
        category: '',
        assigned_to: '',
    });

    useEffect(() => {
        const fetchTicketEdit = async () => {
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

        fetchTicketEdit();
    }, [id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setTicket((prevTicket) => ({
            ...prevTicket,
            [name]: value,
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
            // Example of save API endpoint (replace with your actual API)
            const saveResponse = await fetch('http://localhost:3000/saveRecord', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    module: "HelpDesk",
                    recordId: "17x" + id,
                    values: {
                        "ticket_title": ticket.title,
                        "ticketstatus": ticket.ticket_status,
                        "ticketpriorities": ticket.priority,
                        "ticketseverities": ticket.severity,
                        "ticketcategories": ticket.category,
                        //"assigned_user_id": "19x1"
                    },
                    username: "chothani@illiquidx.com",
                    password: "Admin@123"
                }),
            });

            if (saveResponse.ok) {
                console.log('Ticket updated successfully');
                navigate(`/dashboard/helpdesk-detail/${id}`);
                // Optionally, you can redirect the user or perform additional actions after successful update
            } else {
                console.error('Error updating ticket');
            }
        } catch (error) {
            console.error('Error updating ticket', error);
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
        navigate(`/dashboard/helpdesk-list`);
    };

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
                                                        value={ticket.title || ''}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-4 col-form-label">
                                                    Priority<span className="text-danger">*</span>
                                                </label>
                                                <div className="col-7">
                                                    <select
                                                        name="priority"
                                                        className="form-control"
                                                        id="priority"
                                                        value={ticket.priority}
                                                        onChange={handleInputChange}
                                                        required
                                                    >
                                                        <option value="">Select an Option</option>
                                                        {picklists.priority.map((option) => (
                                                            <option key={option} value={option} selected={ticket.priority === option}>
                                                                {option}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-4 col-form-label">
                                                    Status
                                                </label>
                                                <div className="col-7">
                                                    <select
                                                        name="ticket_status"
                                                        className="form-control"
                                                        id="ticket_status"
                                                        value={ticket.ticket_status}
                                                        onChange={handleInputChange}
                                                    >
                                                        <option value="">Select an Option</option>
                                                        {picklists.ticket_status.map((option) => (
                                                            <option key={option} value={option} selected={ticket.status === option}>
                                                                {option}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-4 col-form-label">
                                                    Severity
                                                </label>
                                                <div className="col-7">
                                                    <select
                                                        name="severity"
                                                        className="form-control"
                                                        id="severity"
                                                        value={ticket.severity}
                                                        onChange={handleInputChange}
                                                    >
                                                        <option value="">Select an Option</option>
                                                        {picklists.severity.map((option) => (
                                                            <option key={option} value={option} selected={ticket.severity === option}>
                                                                {option}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-4 col-form-label">
                                                    Category
                                                </label>
                                                <div className="col-7">
                                                    <select
                                                        name="category"
                                                        className="form-control"
                                                        id="category"
                                                        value={ticket.category}
                                                        onChange={handleInputChange}
                                                    >
                                                        <option value="">Select an Option</option>
                                                        {picklists.category.map((option) => (
                                                            <option key={option} value={option} selected={ticket.category === option}>
                                                                {option}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-4 col-form-label">
                                                    Assigned To<span className="text-danger">*</span>
                                                </label>
                                                <div className="col-7">
                                                    <select
                                                        name="assigned_to"
                                                        className="form-control"
                                                        id="assigned_to"
                                                        value={ticket.assigned_to}
                                                        onChange={handleInputChange}
                                                        required
                                                    >
                                                        <optgroup label="Users">
                                                            {picklists.assigned_to.users.map((option) => (
                                                                <option key={option.value} value={option.value} selected={ticket.assigned_to === option.value}>
                                                                    {option.text}
                                                                </option>
                                                            ))}
                                                        </optgroup>
                                                        <optgroup label="Groups">
                                                            {picklists.assigned_to.groups.map((option) => (
                                                                <option key={option.value} value={option.value} selected={ticket.assigned_to === option.value}>
                                                                    {option.text}
                                                                </option>
                                                            ))}
                                                        </optgroup>
                                                    </select>
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

export default HelpDeskEdit;
