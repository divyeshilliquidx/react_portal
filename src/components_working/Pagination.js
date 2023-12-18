// Pagination.js
import React from 'react';

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
    const getPageNumbers = () => {
        const pageRange = 3;
        const startPage = Math.max(1, currentPage - pageRange);
        const endPage = Math.min(totalPages, currentPage + pageRange);

        return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
    };

    return (
        <ul className="pagination pagination-rounded justify-content-end mb-0 mt-2">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                    Previous
                </button>
            </li>
            {getPageNumbers().map((page) => (
                <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => handlePageChange(page)}>
                        {page}
                    </button>
                </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                    Next
                </button>
            </li>
        </ul>
    );
};

export default Pagination;
