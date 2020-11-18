import React from "react";

const showActionBtns = () => (
  <div className="container">
      <h3 className="text-center">Your Actions</h3>
    <div className="d-flex container justify-content-center flex-row  py-3  ">
      <div className="col-md-6 border border-dark rounded py-2 bg-light">
        <button
          className="btn btn-outline-danger btn-block"
          data-toggle="modal"
          data-target="#addProductModalUser"
        >
          <i className="fas fa-plus"> Add Product</i>
        </button>
        <button
          className="btn btn-outline-success btn-block"
          data-toggle="modal"
          data-target="#viewOrdersModalUser"
        >
          <i className="fas fa-chart-pie"> {""}View Orders</i>
        </button>
      </div>
    </div>
  </div>
);

export default showActionBtns;
