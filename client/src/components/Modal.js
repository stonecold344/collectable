import React from "react";
import { useHistory } from "react-router-dom";

const Modal = (props) => {
  let history = useHistory()
  let user = JSON.parse(localStorage.getItem('user'));

  const onClickHandler = () => {
    return history.push(`/cart/${user._id}`)
  }
  console.log(props)


    return (
      <div className="modal fade" id="productModal" role="dialog" aria-labelledby="productModal" aria-hidden="true" data-dismiss="modal">
        <div className="modal-dialog modal-dialog-centered modal-sm" >
          <div className="modal-content bg-secondary">
            <div className="modal-header bg-primary text-white ">
              <h5 className="modal-title text-capitalize text-center ">item added to cart</h5>
              <span className="close">
                <i className="fas fa-times" data-dismiss="modal"></i>
              </span>
            </div>
            <div className="modal-body">
              <div className="d-flex justify-content-between">
                  <div className="btn btn-success" data-dismiss="modal" >Store</div>
                  <div className="btn btn-info" data-dismiss="modal" onClick={onClickHandler}>Cart</div>
              </div>
              </div>
            </div>
          </div>
        </div>
  );
}
export default Modal