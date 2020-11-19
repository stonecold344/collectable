import React from "react";
import { Link } from "react-router-dom";
import "../../css/Card.css";
import Modal from "../Modal";
// import { addProductToCart } from '../../api/auth'
import { connect, useDispatch } from 'react-redux'
import { addToCart } from '../../actions/cartActions'
import { isAuthenticated } from "../helpers/auth"
import { useSelector } from 'react-redux'





const Product = (props) => {
  let { _id, title, price, continents, image } = props.product;
  const dispatch = useDispatch()
  const user = localStorage.getItem('user')
  const cart = useSelector(state => state.cart)
  console.log(cart)
  console.log(props.product)


  return (
    <div className="col-lg-3 col-md-6 my-3 col-sm-3 d-flex align-items-stretch w-75">
      <div className="card border border-secondary rounded d-flex align-items-stretch">
        {
          <div className="img-container py-4">
            <Link to={{ pathname: `/details/${_id}`}}>
              <img
                src={image}
                alt="product-img"
                className="card-img-top"
              />
            </Link>
            {!isAuthenticated() && user === null ? (null):(continents !== 0 ?  
              (
              <button
                className="btn cart-btn"
                data-toggle="modal"
                data-target="#productModal"
                onClick={()=>{
                  dispatch(addToCart(props.product))
                }}
                >
                <i className="fa fa-cart-plus"></i>
              </button>
              )
            :(              <button
              className="cart-btn btn btn-danger"
              disabled
            >
              Sold Out
            </button>))}
            {Modal(props.product)}

          </div>
        }
        <div className="card-footer">
          <p className=" mb-0 text-capitalize text-center">{title}</p>
          <h6 className="text-info font-italic text-center">
            <span>$</span>{price}
          </h6>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = () => ({
  cart: (product) => {
    addToCart(product)
  }
})

export default connect(mapStateToProps, {addToCart})(Product);


