import React, { Fragment } from 'react'
// import PayPalButton from "./PayPalButton"
import { Link } from "react-router-dom"
import { clearCart }  from '../../actions/cartActions'
import { calcTotal } from '../../actions/totalActions'
import { connect, useDispatch,useSelector } from 'react-redux'
// import Modal from './Modal'




const CartTotal = ({value}) => {
    console.log(value)
    let user = JSON.parse(localStorage.getItem('user'))
    console.log(user._id)
    let shipping = 15
    let subtotal = 0

    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    console.log(cart !== [])
    value.map((product) => {
        let productTotal = 0
        if(product.counter === 0){
            product.counter = 1
            console.log(productTotal)
            productTotal += product.counter * product.price
            console.log(productTotal)
        }
        else{
            console.log(productTotal)
            productTotal += product.counter * product.price
            console.log(productTotal)
        }
        subtotal += productTotal
        return subtotal
    })

    return (
        <Fragment>
            <div className="container d-flex justify-content-center align-items-center">
                {/* <div className=" justify-content-center align-items-center"> */}
                    <div className="text-capitalize text-right ">
                        <button className="btn btn-outline-danger text-dark text-uppercase mb-3 px-4 my-3 btn-block rounded" 
                            type="button" 
                            onClick={()=>dispatch(clearCart())}
                            >
                                Clear Cart
                        </button>
                        <h6 className="text-center">
                               Subtotal :<strong>$ {subtotal} </strong>
                        </h6>
                        <h6 className=" text-center">
                               Shipping :
                            <strong>$ {shipping}</strong>
                        </h6>
                        <h4 className="text-success text-center">
                            Total :<strong className="text-dark"> $ {subtotal + shipping} </strong>
                        </h4>


                         <Link to={{
                             pathname:`/cart/${user._id}/order`,
                             state:{cart:cart, shipping: shipping, total: subtotal + shipping}
                             }}
                          className="text-decoration-none"   >
                         <button 
                            className="btn btn-outline-success text-dark text-uppercase mb-3 px-4 my-3 btn-block rounded"
                            type="button"
                            disabled={cart.length !== 0 ? (false): (true)}
                         >
                             Make Order
                         </button>
                         </Link>
                         {/* {Modal()} */}
                    </div>
                {/* </div> */}
            </div>
        </Fragment>
    )
}

const mapStateToProps = (state) => ({
    cart: () =>{
        clearCart()
        calcTotal()
    }
})

export default connect(mapStateToProps, {clearCart, calcTotal})(CartTotal)