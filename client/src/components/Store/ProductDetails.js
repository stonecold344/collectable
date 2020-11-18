import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProduct } from '../../api/product'
import { connect, useDispatch } from 'react-redux'
import { addToCart } from '../../actions/cartActions' 
import Modal from "../Modal";
import { isAuthenticated } from "../helpers/auth"

const ProductDetails = (props) => {
  const [product, setProduct] = useState({})
  useEffect(() => {
    getProduct(props.match.params.productId)
    .then((res) => {
      setProduct(res.data)
    })
    .catch((err) => console.log(err))

  }, [props])
  const dispatch  = useDispatch()
  const user = localStorage.getItem('user')
  return (
    <div>
          <div className="py-5 details">
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-10 max-auto col-md-6 my-3 text-capitalize d-flex justify-content-center mr-2 ">
                <img src={product.image} alt="product" className="img-fluid border border-dark rounded" />
              </div>
              <div className="col-10 max-auto col-md-6 my-3 text-capitalize text-center border border-dark rounded bg-light py-2">
                <h2>Product : <b className="text-info">{product.title}</b></h2>
                <h4 className="text-title text-muted mt-3 mb-2 text-center">
                  Seller :{}
                </h4>
                <h4 className="text-blue text-center">
                  <strong>
                    Price :<span> $</span>
                    {product.price}
                  </strong>
                </h4>
                <p className="text-capitalize font-weight-bold mt-3 mb-0 text-center">
                  Details : {product.description}
                </p>
                <p className="text-muted font-weight-bold text-center">
                    Stock : {product.continents !== 0 ? (<b className="text-success ">{product.continents}</b>) : (<b className="text-danger">sold out</b>)}
                </p>
                <div className="row d-flex justify-content-center">
                  <div className="btn btn-secondary mr-1 border border-dark">
                    <Link to="/store" className="link-text text-white text-outline-dark">
                      back to store
                    </Link>
                  </div>
                  {!isAuthenticated() && user === null ? 
                    (null):(product.continents !== 0 ?
                      (
                    <div 
                    data-toggle="modal"
                    data-target="#productModal"
                    className="btn btn-success border border-dark" 
                    onClick={() => {
                      dispatch(addToCart(product))
                    }
                    }
                  >
                      add to cart
                  </div>
                  ):(
                    <div
                    className="btn btn-danger link-text border border-dark"
                    disabled
                  >
                    Sold Out
                  </div> 
                  ))}
                  {Modal(product)}
                </div>
              </div>
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
export default connect(mapStateToProps, {addToCart})(ProductDetails)
