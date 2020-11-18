import React from 'react'
// import { checkIfInCart } from '../../api/product'
import { connect, useDispatch } from 'react-redux'
import { deleteFromCart } from '../../actions/cartActions'
import { calcTotal } from '../../actions/totalActions'
import { createOrder } from '../../actions/orderActions'
import { increment, decrement } from '../../actions/counterActions'
// import { useSelector } from 'react-redux'

const CartItem = ({value}) => {


    const { title, image, price } = value;
    
    let {counter} = value
    if(counter === 0){
        counter += 1
    }
    let productTotal = price * counter
    const dispatch = useDispatch()
    // const count = useSelector(state => state.counter)
    return (
        <div>
        <div className="row my-1 text-capitalize text-center">
            <div className="col-10 mx-auto col-lg-2">
                <img src={image} style={{width:"5rem",height:"5rem"}} className="img-fluid" alt="product"/>
            </div>
            <div className="col-10 mx-auto col-lg-2">
                <span className="d-lg-none">product : </span>
                {title}
            </div>
            <div className="col-10 mx-auto col-lg-2">
                <span className="d-lg-none">price : </span>
                {price}
            </div>
            <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0">
                <div className="d-flex justify-content-center">
                    <div>
                        <span className="btn btn-black btn-outline-dark mx-1" onClick={()=>{dispatch(decrement(value))}}>-</span>
                    </div>
                    <div>
                        <span className="btn btn-outline-dark mx-1" >{counter}</span>
                    </div>
                    <div>
                        <span className="btn btn-black btn-outline-dark mx-1" onClick={()=>{dispatch(increment(value))}}>+</span>
                    </div>
                </div>
            </div>
            <div className="col-10 mx-auto col-lg-2">
                <button className="btn btn-outline-danger"
                onClick={()=>{
                    dispatch(deleteFromCart(value))
                }}>
                    <div className="cart-icon">
                        <span className="fa fa-trash"></span>
                    </div>
                </button>
            </div>
            <div className="col-10 mx-auto col-lg-2">
                <span ><strong>item total : ${productTotal}</strong></span>
            </div>
        </div>
        <hr/>
        </div>
    )
}
const mapStateToProps = (state) => ({
    cart: (_id) => {
        deleteFromCart(_id)
    },
    counter: () => {
        increment()
        decrement()
    },
    order: () => {
        createOrder()
    }
  })

export default connect(mapStateToProps,{deleteFromCart, calcTotal, createOrder})(CartItem)
