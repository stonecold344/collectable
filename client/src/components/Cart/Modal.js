import React, { useState, Fragment } from "react";
import { showErrMessage, showSuccessMessage } from "../helpers/message";
import { showLoading } from "../helpers/loading";
// import PayPalButton from "./PayPalButton"
import GPayButton from 'react-google-pay-button'




const Modal = () => {

  const [formData, setFormData] = useState({
    city: "",
    address: "",
    cardType: "",
    cardNum: "",
    cvc: "",
    expDate: "",
    successMsg: false,
    errorMsg: false,
    loading: false,
  });
  const {city, address, cardType, cardNum, cvc, expDate, successMsg, errorMsg, loading } = formData;

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      successMsg: "",
      errorMsg: "",
    });
  };
const onSubmitHandler = (e) => {
    e.preventDefault();
    // const {
    //   city,
    //   address,
    //   cardType,
    //   cardNum,
    //   cvc,
    // } = formData;
    const data = {
      city,
      address,
      cardType,
      cardNum,
      cvc,
      expDate
    };
    console(data)
  };
    return (
      <div className="modal fade" id="makeOrderModal" role="dialog" aria-labelledby="productModal" aria-hidden="true" data-dismiss="modal">
        <div className="modal-dialog modal-dialog-centered modal-lg" >
          <div className="modal-content bg-secondary">
            <div className="modal-header bg-success text-white">
              <h5 className="modal-title">Order</h5>
              <span className="close">
                <i className="fas fa-times" data-dismiss="modal"></i>
              </span>
            </div>
              <form onSubmit={onSubmitHandler}>
              <div className="modal-body my-4 ">
              {errorMsg && showErrMessage(errorMsg)}
                  {successMsg && showSuccessMessage(successMsg)}
                  {loading ? (
                    <div className="text-center pb-4">{showLoading()}</div>
                  ) : (
                    <Fragment>

                  <div>
                  </div>
                  <br/>
                  <div className="form-row">
                      <div className="form-group col-md-6">
                          <label className="text-white float-left">City :</label>
                          <input
                            type="text"
                            className="form-control input-sm "
                            name="city"
                            onChange={handleChange}
                        ></input>
                      </div>
                      <div className="form-group col-md-6">
                        <label className="text-white float-left">Address :</label>
                        <input
                            type="text"
                            className="form-control input-sm "
                            name="address"
                            onChange={handleChange}
                        ></input>
                    </div>
                  </div>
                  <div className="form-row">
                      <div className="form-group col-md-6">
                          <label className="text-white float-left">Card Type :</label>
                          <input
                            type="text"
                            className="form-control input-sm "
                            name="type"
                            onChange={handleChange}
                        ></input>
                      </div>
                      <div className="form-group col-md-6">
                        <label className="text-white float-left">Card Number :</label>
                        <input
                            type="text"
                            className="form-control input-sm "
                            name="card_num"
                            onChange={handleChange}
                        ></input>
                    </div>
                  </div>
                  <div className="form-row">
                      <div className="form-group col-md-6">
                          <label className="text-white float-left">CVC :</label>
                          <input
                            type="text"
                            className="form-control input-sm "
                            name="cvc"
                            onChange={handleChange}
                        ></input>
                      </div>
                      <div className="form-group col-md-6">
                        <label className="text-white float-left">Exp Date :</label>
                        <input
                            type="text"
                            className="form-control input-sm "
                            name="exp"
                            onChange={handleChange}
                        ></input>
                    </div>
                  </div>
                    </Fragment>
                  )}
                        <GPayButton
                          totalPriceStatus={'FINAL'}
                          totalPrice={'14.45'}
                          currencyCode={'USD'}
                          countryCode={'US'}
                          development={true}
                        />
                  </div>

                  <button className="btn btn-success my-4" 
                  type="submit"
                  data-dismiss="modal"
                  >
                    Continue to payment
                  </button>
              </form>      
            </div>
          </div>
        </div>
  )
}


export default Modal