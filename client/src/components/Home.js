import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getLatestProducts } from "../actions/productsActions";
import { connect, useSelector } from "react-redux";
import { addToCart } from "../actions/cartActions";
import Product from './Store/Product'


const Home = ({ getLatestProducts, addToCart }) => {
  useEffect(() => {
    getLatestProducts();
  }, [getLatestProducts]);
  const data = useSelector((state) => state.productsList);

  // const user = localStorage.getItem("user");

  let cards =
    data.length > 0 ? data &&
    data.map((product) => {
      return <Product key={product._id} product={product} />;
    }):(<h1 className="text-center">Error fetching data!</h1>)

  return (
    <div className="container-fluid home py-5">
      {/* <Carousel/> */}
      <div className="container-fluid py-3">
        <div className="row text-center">
          <div className="col-md-5 mx-auto align-self-center mb-2 mt-4">
            <div className="home-card border ">
              <h2 className="site-title">Welcome to Collectable</h2>
              <button className="btn btn-outline-info">
                <Link to="store" className="link-text">
                  Go to Store
                </Link>
              </button>
              <p>
                Don't have an account ?to sign up click here{" "}
                <Link to="signup" className="link-text">
                  Sign Up
                </Link>
              </p>{" "}
            </div>
          </div>
          <div className="container py-3"><h2 className="site-title">Latest Products</h2></div>

          <div className="container d-flex justify-content-center py-2">

            <div className="row  col-9 bg-light border border-dark rounded d-flex justify-content-center">
              {cards}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  productList: state.productsList,
  cart: (_id) => {
    addToCart(_id);
  },
});

export default connect(mapStateToProps, { getLatestProducts, addToCart })(Home);
