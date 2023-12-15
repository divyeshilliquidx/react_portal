import React from 'react';
import { CSVLink } from 'react-csv';

const ExportData = ({ data, headers, filename }) => {
    return (
        <CSVLink data={data} headers={headers} filename={filename}>Export Data</CSVLink>
    );
};

export default ExportData;
