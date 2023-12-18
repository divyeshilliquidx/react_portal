import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { format12HourTime, USDCurrencyFormat, formatNumber } from '../helper';
// import { setHelpDeskData } from '../actions/helpDeskActions';

const DocumentDetail = () => {
    const user_id = process.env.REACT_APP_USERID;
    const user_name = process.env.REACT_APP_USERNAME;
    const user_password = process.env.REACT_APP_USERPASSWORD;

    const { id } = useParams();
    const [document, setDocument] = useState(null);
    //console.log(setHelpDeskData)
    useEffect(() => {
        const fetchDocumentDetails = async () => {
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
                    console.error('Error fetching document details');
                }
            } catch (error) {
                console.error('Error fetching document details', error);
            }
        };

        fetchDocumentDetails();
    }, [id]);

    return (
        <>
            {document && (
                <div className="content-page">
                    <div className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12">
                                    <div className="page-title-box">
                                        <div className="page-title-right">
                                            <ol className="breadcrumb m-0">
                                                <li className="breadcrumb-item">
                                                    <a href="#">Document</a>
                                                </li>
                                                <li className="breadcrumb-item">
                                                    <Link to="/dashboard/document-list">All Tickets</Link>
                                                </li>
                                                <li className="breadcrumb-item active">{document.note_no}</li>
                                            </ol>
                                        </div>
                                        <h4 className="page-title">{document.note_no}</h4>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="card col-lg-12">
                                    <div className="detailview-content container-fluid" style={{}}>
                                        <div className="block">
                                            <div>
                                                <h4 className="textOverflowEllipsis maxWidth50">&nbsp;Document Details</h4>
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
                                                            <td>{document.title}</td>
                                                            <td>
                                                                <b>FileName</b>
                                                            </td>
                                                            <td>{document.filename}</td>
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

export default DocumentDetail;
