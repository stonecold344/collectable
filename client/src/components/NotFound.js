import React from "react";

const NotFound = (props) => {
  return (
    <div className="container bg-light">
      <div className="row hv-100">
        <div className="col-10 mx-auto text-center text-title text-uppercase pt-5">
          <h1 className="display-3">404</h1>
          <h1 className="text-danger">error</h1>
          <h1>page not found!</h1>
          <h3>
            the requested URL
            <span className="text-danger">
              {props.location.pathname}
            </span>{" "}
            was not found!
          </h3>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
