import React, { useEffect, Fragment } from 'react'
import CartColumns from "./CartColumns"
import Title from '../helpers/title'
// import { getProducts } from "../../../api/product";
// import { getUserCart } from "../../api/auth"
import EmptyCart from "./EmptyCart"
import CartItem from "./CartItem"
import CartTotal from './CartTotal'
import { connect } from 'react-redux'
import { getCart } from '../../actions/cartActions'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'




const Cart = ({getCart}) => {
    useEffect(() => {
        getCart()
    }, [getCart]);

    const cart = useSelector(state => state.cart)


    console.log(cart)
    const cartView =  cart && cart.length > 0 ?
        (<Fragment>
            <CartColumns />
            <hr/>
            {cart.map((product)=>{
                return <CartItem key={product._id} value={product} />
            })}
        </Fragment>
        ):
        (
            <EmptyCart />
        )
    return (
        <div className="cart py-5">
        <Fragment>
            <div className="container py-5">
                <div className="">
                    <Title name="your " title="cart" />
                </div>
                <div className="row d-flex justify-content-center py-5">
                    <div className="col-10 col-lg-9 col-md-6 col-sm-6  my-5">   
                        <div className="container float-left border border-secondary rounded bg-light">
                            {cartView}
                        </div>
                    </div>
                    <div className="col-10 col-lg-3 col-md-6 col-sm-6 my-5 ">
                         <div className="container border border-secondary rounded float-left bg-light">
                            <div>
                                <CartTotal value={cart}/>
                            </div>
                        </div>
                    </div>
                <br/>
                </div>
            </div>
        </Fragment>
        </div>
        )
}

Cart.propTypes = {
    getCart: PropTypes.func.isRequired,
    cart: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    cart: state.cart
})

export default connect(mapStateToProps, { getCart } )(Cart)

