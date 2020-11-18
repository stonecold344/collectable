import React, { useState, useEffect } from "react";
import ShowUpdateProductModal from "./UpdateProduct";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { removeProduct } from '../../api/product'
import { getUserProducts } from '../../api/product'



// import getUserProducts from

const ShowUserProducts = () => {
  const [p, setP] = useState({});
  const [userProducts, setUserProducts] = useState([])
  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(()=>{
    getUserProducts(user._id)
    .then(res => {
      console.log(res)

      setUserProducts(res.data.data)
    }).catch(err => console.log(err))
  },[user._id])


  return (
    <div className="container-fluid py-3">
      <h3 className="text-center">Your Products</h3>

      <div className="d-flex justify-content-center ">
         <div
          className="row border border-dark rounded bg-light  col-sm-12 col-lg-9 d-flex align-items-stretch"
        > 
          {userProducts &&
            userProducts.map((product) => {
              console.log(product._id);
              return (
                <div
                  className="col-12 mx-auto col-lg-3 col-md-3 col-sm-9 my-3 d-flex align-items-stretch"
                  key={product._id}
                >
                  <div className="card border border-secondary rounded d-flex align-items-stretch">
                    <div className="img-container p-4">

                      <img
                        src={`${product.image}`}
                        alt="product img"
                        className="card-img-top"
                      />
                      <button
                        className="cart-btn"
                        data-toggle="modal"
                        data-target="#updateProductModal"
                        onClick={() => {
                          setP(product);
                        }}
                      >
                        Update
                      </button>
                      <button 
                      className="remove-btn btn btn-danger"
                    //   data-toggle="modal"
                    //   data-target="#removeProductModalUser"
                        onClick={()=>{
                            removeProduct(product._id)
                            window.location.reload(false);
                        }}
                      >
                          Remove
                      </button>
                    </div>
                    <div className="card-footer">
                      <p
                        className=" mb-0 text-capitalize text-center"
                        style={{ fontSize: "relative-size" }}
                      >
                        {product.title}
                      </p>
                      <h6 className="text-info font-italic text-center">
                        <span>$</span>
                        {product.price}
                      </h6>
                    </div>
                  </div>
                  {!p ? (
                    console.log("null")
                  ) : (
                    <ShowUpdateProductModal props={p} id={p._id} />
                  )}

                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ShowUserProducts;
