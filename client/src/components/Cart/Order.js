import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PayPalButton from "./PayPalButton";
import GPayButton from "react-google-pay-button";
import isEmpty from "validator/lib/isEmpty";

const Order = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    city: "",
    zip: "",
    address: "",
    state: "",
    country: "",
  });
  const [check, setCheck] = useState(false);
  const { fullName, email, city, zip, address, state, country } = formData;
  console.log(props);
  let products = props.location.state.cart;

  const data = useSelector((state) => state.cart);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      successMsg: "",
      errorMsg: "",
    });
    console.log(e.target.name, e.target.value);
  };
  const onCheck = (e) => {
    console.log(e);
    if (check) {
      setCheck(false);
    } else {
      setCheck(true);
    }
  };
  return (
    <div className="container py-3">
      <div className="row">
        <div className="col-lg-6 col-md-8 col-sm-10 offset-lg-0 offset-md-2 offset-sm-1">
          <div className="h5">Billing Address</div>

          <div id="details" className="bg-white rounded pb-5">
            <form>
              <div className="form-group">
                {" "}
                <label className="text-muted">Full Name</label>{" "}
                <input
                  type="text"
                  placeholder="David Smith"
                  value={fullName}
                  className="form-control"
                  name="fullName"
                  onChange={handleChange}
                />{" "}
              </div>
              <div className="form-group">
                {" "}
                <label className="text-muted">Email</label>
                <div className="d-flex justify-content-start align-items-center rounded p-2">
                  {" "}
                  <input
                    type="email"
                    value={email}
                    placeholder="david.343@gmail.com"
                    name="email"
                    onChange={handleChange}
                  />{" "}
                  <span className="fas fa-check text-success pr-sm-2 pr-0"></span>{" "}
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    {" "}
                    <label>City</label>
                    <div className="d-flex justify-content-start align-items-center rounded p-2">
                      {" "}
                      <input
                        type="text"
                        value={city}
                        placeholder="Houston"
                        name="city"
                        onChange={handleChange}
                      />{" "}
                      <span className="fas fa-check text-success pr-2"></span>{" "}
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    {" "}
                    <label>Zip code</label>
                    <div className="d-flex justify-content-start align-items-center rounded p-2">
                      {" "}
                      <input
                        type="text"
                        value={zip}
                        placeholder="77001"
                        name="zip"
                        onChange={handleChange}
                      />{" "}
                      <span className="fas fa-check text-success pr-2"></span>{" "}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    {" "}
                    <label>Address</label>
                    <div className="d-flex justify-content-start align-items-center rounded p-2">
                      {" "}
                      <input
                        type="text"
                        value={address}
                        placeholder="542 W.14th Street"
                        name="address"
                        onChange={handleChange}
                      />{" "}
                      <span className="fas fa-check text-success pr-2"></span>{" "}
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  {country === "israel" ? null : (
                    <div className="form-group">
                      {" "}
                      <label>State</label>
                      <div className="d-flex justify-content-start align-items-center rounded p-2">
                        {" "}
                        <input
                          type="text"
                          value={state}
                          placeholder="NY"
                          name="state"
                          onChange={handleChange}
                        />{" "}
                        <span className="fas fa-check text-success pr-2"></span>{" "}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <label>Country</label>
              <select name="country" id="country" onChange={handleChange}>
                <option defaultValue={"Choose a country"}>
                  {!country ? "Choose one option..." : country}
                </option>
                <option value="usa">USA</option>
                <option value="israel">Israel</option>
              </select>
              <div className="py-2 d-flex justify-content-space-between">
                <label>
                  <input type="checkbox" name="checkbox" onChange={onCheck} />{" "}
                  Use shipping data from your PayPal account
                </label>
              </div>
            </form>
          </div>
          <div className="col-md-6 d-flex justify-content-center">
            <Link to="/store">
              <button className="btn btn-outline-success text-uppercase">
                back to shopping
              </button>
            </Link>
          </div>
        </div>
        <div className="col-lg-6 col-md-8 col-sm-10 offset-lg-0 offset-md-2 offset-sm-1 pt-lg-0 pt-3">
          <div id="cart-c" className="bg-white rounded">
            <div className="d-flex justify-content-between align-items-center">
              <div className="h6">Cart Summary</div>
              <div className="h6">
                {" "}
                <Link
                  to={{ pathname: `/cart/${user._id}` }}
                  className="h5 text-primary"
                >
                  Edit
                </Link>{" "}
              </div>
            </div>
            {products &&
              products.map((product) => {
                return (
                  <div
                    className="d-flex justify-content-between align-items-center pt-3 pb-2 border-bottom"
                    key={product._id}
                  >
                    <div className="item pr-2">
                      <Link
                        to={{ pathname: `/details/${product._id}` }}
                        className="h5 text-primary"
                      >
                        <img
                          src={product.image}
                          alt={product.title}
                          width="80"
                          height="80"
                        />
                      </Link>
                      <div className="number">{product.counter}</div>
                    </div>
                    <div className="d-flex flex-column px-3">
                      <b className="h5">{product.title}</b>
                    </div>
                    <div className="ml-auto">
                      {" "}
                      <b className="h5">
                        {product.price * product.counter}
                      </b>{" "}
                    </div>
                  </div>
                );
              })}
            <div className="d-flex align-items-center">
              <div className="display-5">Subtotal</div>
              <div className="ml-auto font-weight-bold">
                {props.location.state.total - props.location.state.shipping}
              </div>
            </div>
            <div className="d-flex align-items-center py-2 border-bottom">
              <div className="display-5">Shipping</div>
              <div className="ml-auto font-weight-bold">
                {props.location.state.shipping}
              </div>
            </div>
            <div className="d-flex align-items-center py-2">
              <div className="display-5">Total</div>
              <div className="ml-auto d-flex">
                <div className="text-primary text-uppercase px-3">usd</div>
                <div className="font-weight-bold">
                  ${props.location.state.total}
                </div>
              </div>
            </div>
          </div>
          {/* <p className="text-muted">Need help with an order?</p>
          <p className="text-muted">
            <a href="/" className="text-danger">
              Hotline:
            </a>
            +314440160 (International)
          </p> */}

          <div className="row d-flex">
            <div className="col-md-12 d-flex justify-content-center">
              {!check ? (
                isEmpty(fullName) ||
                isEmpty(email) ||
                isEmpty(city) ||
                isEmpty(zip) ||
                isEmpty(address) ||
                isEmpty(state) ||
                isEmpty(country) ? (
                  <button className="btn btn-warning" disabled={true}>
                    Fill the form to prosed to checkout
                  </button>
                ) : (
                  <PayPalButton
                    total={
                      parseInt(props.location.state.total) +
                      props.location.state.shipping
                    }
                    itemsOrder={products}
                    data={formData}
                  />
                )
              ) : (
                <PayPalButton
                  total={
                    parseInt(props.location.state.total) +
                    props.location.state.shipping
                  }
                  itemsOrder={products}
                />
              )}
            </div>

            {/* <div className="col-md-12 d-flex justify-content-center">
              <GPayButton
                totalPriceStatus={"FINAL"}
                totalPrice={"14.45"}
                currencyCode={"USD"}
                countryCode={"US"}
                development={true}
                style={{
                  buttonSizeMode: "fill",
                }}
              />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Order;
