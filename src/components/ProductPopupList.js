import React, { useState } from 'react';

const ProductPopupList = ({ products, onSelectProduct, onClose }) => {
    const handleProductSelect = (selectedProduct) => {
        onSelectProduct(selectedProduct);
        onClose();
    };

    return (
        <>
            <div className="custombox-content custombox-x-center custombox-y-center custombox-fadein custombox-open product-popup-list">
                <div className="modal-overlay" onClick={onClose} />
                <div id="custom-modal" className="popupListModal modal-demo" style={{ display: 'block', top: 80 }}>
                    <button type="button" className="close" onClick={onClose}>
                        <span>×</span>
                        <span className="sr-only">Close</span>
                    </button>
                    <h4 className="custom-modal-title">Select Products</h4>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card-box">
                                <div className="table-responsive">
                                    <table className="table mb-0">
                                        <thead>
                                            <tr>
                                                <th>Product Name</th>
                                                <th>Product Code</th>
                                                <th>Product Category</th>
                                                <th>Manufacturer</th>
                                                <th>GL Account</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.map((product) => (
                                                <tr key={product.productid} onClick={() => handleProductSelect(product)}>
                                                    <td scope="row"><a href='#'>{product.productname}</a></td>
                                                    <td scope="row">{product.product_no}</td>
                                                    <td scope="row">{product.productcategory}</td>
                                                    <td scope="row">{product.manufacturer}</td>
                                                    <td scope="row">{product.glacct}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductPopupList;
