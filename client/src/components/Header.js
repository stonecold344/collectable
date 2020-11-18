import React, { Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { saveUserCart } from '../api/auth'
import { isAuthenticated, logout } from "./helpers/auth"
import { useSelector } from 'react-redux'

const Header = ({ history }) => {
    let user = JSON.parse(localStorage.getItem('user'))
    let cart = useSelector(state => state.cart)
    console.log(cart)
    const handelLogOut = e =>{
        saveUserCart(user._id, cart)
        logout();
    }
    const showNav = () => (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="navbar-brand" to="/"><i className="fas fa-parachute-box fa-lg"></i><i className="site-title">Collectable</i></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/">
                            <span><i className="fas fa-home"></i> Home</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/store">
                            <span><i className="fas fa-store"></i> Store</span>
                        </Link>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    {!isAuthenticated() && (
                        <Fragment>
                            <li className="nav-item ">
                                <Link className="nav-link" id="signup" to="/signup">
                                    <i className="fas fa-edit"></i> SignUp
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link " id="signin" to="/signin">
                                    <i className="fas fa-sign-in-alt"></i> SignIn
                                </Link>
                            </li>
                        </Fragment>
                    )}

                    {isAuthenticated() && isAuthenticated().role === 0 && (
                        <Fragment>
                            <li className="nav-item ">
                                <Link className="nav-link" id="dashboard" to="/user/dashboard">
                                    <i className="fas fa-user"></i> Dashboard
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" id="cart"  to={{pathname:`/cart/${user._id}`}}>
                                    <i className="fas fa-shopping-cart"></i> Cart
                                </Link>
                            </li>
                        </Fragment>
                    )}

                    {isAuthenticated() && isAuthenticated().role === 1 && (
                        <Fragment>
                            <li className="nav-item ">
                                <Link className="nav-link" id="dashboard" to="/admin/dashboard">
                                <i className="fas fa-user"></i> Dashboard
                                </Link>
                            </li>
                        </Fragment>
                    )}

                    {isAuthenticated() && (
                        <Fragment>
                            <li className="nav-item ">
                                <Link className="nav-link" onClick={handelLogOut} to="/signin">
                                    <div id="logout">
                                        <i className="fas fa-sign-out-alt"></i> LogOut
                                    </div>
                                </Link>
                            </li>
                        </Fragment>
                    )}
                </ul>
            </div>
        </nav>
    )
    //render
    return(
        <header id="header">
            {showNav()}
        </header>
    )
}

export default withRouter(Header);
