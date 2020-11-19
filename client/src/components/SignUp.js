import React, { useState, useEffect } from "react";
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import equals from "validator/lib/equals";
import { showErrMessage, showSuccessMessage } from "./helpers/message";
import { showLoading } from "./helpers/loading";
import { Link, useHistory } from "react-router-dom";
import { signup } from "../api/auth";
import { isAuthenticated } from "./helpers/auth";

const SignUp = () => {
  let history = useHistory();
  useEffect(() => {
    if (isAuthenticated() && isAuthenticated().role === 1) {
      history.push("/admin/dashboard");
    } else if (isAuthenticated() && isAuthenticated().role === 0) {
      history.push("/user/dashboard");
    }
  }, [history]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    password2: "",
    successMsg: false,
    errorMsg: false,
    loading: false,
  });
  const {
    firstName,
    lastName,
    username,
    email,
    password,
    password2,
    successMsg,
    errorMsg,
    loading,
  } = formData;

  // ********************
  // Event handlers
  // ********************

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      successMsg: "",
      errorMsg: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //Client side validation
    if (
      isEmpty(firstName) ||
      isEmpty(lastName) ||
      isEmpty(username) ||
      isEmpty(email) ||
      isEmpty(password) ||
      isEmpty(password2)
    ) {
      setFormData({
        ...formData,
        errorMsg: "All fields are required !",
      });
    } else if (!isEmail(email)) {
      setFormData({
        ...formData,
        errorMsg: "Invalid E-mail !",
      });
    } else if (!equals(password, password2)) {
      setFormData({
        ...formData,
        errorMsg: "Passwords do not match !",
      });
    } else {
      //Success
      const {
        firstName,
        lastName,
        username,
        email,
        password,
        password2,
      } = formData;
      const data = {
        firstName,
        lastName,
        username,
        email,
        password,
        password2,
      };

      setFormData({
        ...formData,
        loading: true,
      });
      signup(data)
        .then((response) => {
          console.log("Axios signup success", response);
          setFormData({
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            password: "",
            password2: "",
            loading: false,
            successMsg: response.data.successMessage,
          });
        })
        .catch((err) => {
          console.log("Axios signup error", err);
          setFormData({
            ...formData,
            loading: false,
            errorMsg: err.response.data.errorMessage,
          });
        });
    }
  };

  // ********************
  // View
  // ********************
  const showSignUpForm = () => (
    <div className="card bg-light clearfix">
      <article className="card-body mx-auto">
        <h4 className="card-title mt-3 text-center">Create Account</h4>
        <p className="text-center">Get started with your free account</p>
        <p>
          <Link to="/" className="btn btn-block btn-twitter">
            {" "}
            <i className="fab fa-twitter"></i> Create via Twitter
          </Link>
          <Link to="/" className="btn btn-block btn-facebook">
            {" "}
            <i className="fab fa-facebook-f"></i> Create via facebook
          </Link>
        </p>
        <p className="divider-text">
          <span className="bg-light">OR</span>
        </p>
        <form className="signup-form" onSubmit={handleSubmit} noValidate>
          <div className="row ">
            <div className="form-group input-group">
              <div className="col">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-user"></i>
                  </span>
                  <input
                    name="firstName"
                    value={firstName}
                    className="form-control"
                    placeholder="First Name"
                    type="text"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-user"></i>
                  </span>
                  <input
                    name="lastName"
                    value={lastName}
                    className="form-control"
                    placeholder="Last Name"
                    type="text"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="form-group input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fa fa-user"></i>{" "}
              </span>
            </div>
            <input
              name="username"
              value={username}
              className="form-control"
              placeholder="Username"
              type="text"
              onChange={handleChange}
            />
          </div>
          <div className="form-group input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fa fa-envelope"></i>{" "}
              </span>
            </div>
            <input
              name="email"
              value={email}
              className="form-control"
              placeholder="Email address"
              type="email"
              onChange={handleChange}
            />
          </div>
          <div className="form-group input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                {" "}
                <i className="fa fa-lock"></i>{" "}
              </span>
            </div>
            <input
              name="password"
              value={password}
              className="form-control"
              placeholder="Create password"
              onChange={handleChange}
              type="password"
            />
          </div>
          <div className="form-group input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                {" "}
                <i className="fa fa-lock"></i>{" "}
              </span>
            </div>
            <input
              name="password2"
              value={password2}
              className="form-control"
              placeholder="Repeat password"
              onChange={handleChange}
              type="password"
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary btn-block">
              {" "}
              Create Account{" "}
            </button>
          </div>
          <p className="text-center">
            Have an account?{" "}
            <Link to="/signin" className="link-text">
              Sign In
            </Link>{" "}
          </p>
        </form>
      </article>
    </div>
  );

  // ********************
  // Render
  // ********************
  return (
    <div className="container-fluid h-100 signup ">
      <div className="container">
        <div className="row vh-100 ">
          <div className="col-md-5 mx-auto align-self-center">
            <br />
            {(successMsg && showSuccessMessage(successMsg)) ||
              (errorMsg && showErrMessage(errorMsg))}
            {loading && <div className="text-center pb-4">{showLoading()}</div>}
            {showSignUpForm()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
