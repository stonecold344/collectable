import React from "react";

const showActionBtns = () => (
  <div className="jumbotron bg-white">
    <div className="d-flex container justify-content-center flex-row">
      <div className="col-md-6">
        <button
          className="btn btn-outline-primary btn-block"
          data-toggle="modal"
          data-target="#addCategoryModal"
        >
          <i className="fas fa-plus"> Add Category</i>
        </button>
        <button
          className="btn btn-outline-danger btn-block"
          data-toggle="modal"
          data-target="#addProductModal"
        >
          <i className="fas fa-plus"> Add Product</i>
        </button>
        <button
          className="btn btn-outline-warning btn-block"
          data-toggle="modal"
          data-target="#updateProductModal"
        >
          <i className="fas fa-sync"> Update Product</i>
        </button>
        <button
          className="btn btn-outline-secondary btn-block"
          data-toggle="modal"
          data-target="#removeCategoryModal"
        >
          <i className="fas fa-minus"> Remove Category</i>
        </button>
        <button
          className="btn btn-outline-info btn-block"
          data-toggle="modal"
          data-target="#removeProductModal"
        >
          <i className="fas fa-minus"> Remove Product</i>
        </button>
        <button
          className="btn btn-outline-success btn-block"
          data-toggle="modal"
          data-target="#viewOrdersModal"
        >
          <i className="fas fa-chart-pie"> {""}View Orders</i>
        </button>
      </div>
    </div>
  </div>
);

export default showActionBtns;
