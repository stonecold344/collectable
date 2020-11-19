import React, { Fragment, useState } from 'react'
import { removeCategory } from '../../api/category'
import { showErrMessage, showSuccessMessage } from "../helpers/message";
import { showLoading } from "../helpers/loading";
import isEmpty from "validator/lib/isEmpty";


const ShowRemoveCategoryModal = () =>{
    const [category, setCategory] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [loading, setLoading] = useState(false);

    // ********************
    // Event Handler
    // ********************
    const handleMessages = (e) => {
        setErrorMsg("");
        setSuccessMsg("");
      };
    const onChangeHandler = (e) => {
        setErrorMsg("");
        setSuccessMsg("");
        setCategory(e.target.value);
    };
    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (isEmpty(category)) {
          setErrorMsg("Error! Please enter a category!");
        }
        else {
          const data = { category };
          setLoading(true);
          removeCategory(data)
            .then((response) => {
              setLoading(false);
              setSuccessMsg(response.data.successMessage);
              setCategory("");
            })
            .catch((err) => {
              setLoading(false);
              setErrorMsg(err.response.data.errorMessage);
            });
        }
      };
    // ********************
    // View
    // ********************
    return(
      <div id="removeCategoryModal" className="modal fade" onClick={handleMessages}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content bg-light">
                      <div className="modal-header bg-dark text-white">
                          <h5 className="modal-title">Remove Category</h5>
                          <span className="close">
                            <i className="fas fa-times" data-dismiss="modal"></i>
                          </span>
                      </div>
                      <form  onSubmit={onSubmitHandler}>
                          <div className="modal-body my-4 ">
                              {errorMsg && showErrMessage(errorMsg)}
                              {successMsg && showSuccessMessage(successMsg)}
                              {loading ? (<div className="text-center pb-4">{showLoading()}</div>
                              ):(
                                  <Fragment>
                                      <label className="text-dark">Enter the category :</label>
                                      <input
                                          type="text"
                                          className="form-control input-sm"
                                          placeholder="Example: Electronics"
                                          name="delete"
                                          value={category}
                                          onChange={onChangeHandler}
                                      ></input>
                                  </Fragment>
                                   )}
                          </div>
                          <hr/>
                          <div className="modal-fotter d-flex justify-content-center my-4">
                                  <div className="container-fluid">
                                  <button className="btn btn-secondary btn-block" type="submit">Submit</button>
                                  <button className="btn btn-dark btn-block" data-dismiss="modal">Close </button>
                              </div>
                          </div>
                      </form>
              </div>
          </div>
      </div>)
}
export default ShowRemoveCategoryModal