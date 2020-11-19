import React from 'react'
import {Link} from 'react-router-dom'

export default function EmptyCart() {
    return (
        <div className="d-flex justify-content-center">
            <div className="row">
                <div className="col-10 mx-auto text-center text-title ">
                    <h1>Your cart is empty</h1>
                    <p>Go to <Link to="/store">store</Link></p>
                </div>
            </div>
        </div>
    )
}
