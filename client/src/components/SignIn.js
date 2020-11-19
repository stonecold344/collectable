import React,{ useState, useEffect } from 'react'
import { Link, useHistory } from "react-router-dom"
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import { showErrMessage } from "./helpers/message"
import { showLoading } from "./helpers/loading"
import { signin } from "../api/auth"
import { setAuthentication, isAuthenticated } from "./helpers/auth"

const SignIn = () => {
    const history = useHistory();
    useEffect(() => {
        if(isAuthenticated() && isAuthenticated().role === 1) {
            history.push("/admin/dashboard");
        }
        else if(isAuthenticated() && isAuthenticated().role === 0){
            history.push("/user/dashboard");
        }
    }, [history])
    const [formData,setFormData] = useState({
        email: '',
        password: '',
        errorMsg: false,
        loading: false,
    })

    const {
        email,
        password,
        errorMsg,
        loading } = formData
    // ********************
    // Event handlers
    // ********************
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:e.target.value,
            successMsg:'',
            errorMsg:''
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(e)
        //Client side validation
        if(isEmpty(email) || isEmpty(password)){
               setFormData({
                   ...formData,errorMsg:'All fields are required !'
               })
           }
           else if(!isEmail(email)){
               setFormData({
                   ...formData,errorMsg:'Invalid E-mail !'
               })
           }
           else{
               //Success
               const {email,password} = formData
               const data = {email,password}
               setFormData({
                   ...formData,
                   loading:true
               })
               signin(data)
               //Set cookies & local storage
                   .then(response => {
                       setAuthentication(response.data.token, response.data.user)
                       if(isAuthenticated() && isAuthenticated().role === 1) {
                           console.log('Redirecting to admin dashboard')
                           history.push("/admin/dashboard");
                       }
                       else{
                           console.log('Redirecting to user dashboard')
                           history.push("/user/dashboard");
                       }
                   })
                   .catch(err => {
                       console.log("Sign in api function error: ",err)
                       setFormData({
                        ...formData,
                        loading:false,
                        errorMsg:'Wrong details!'
                    })
                   })
           }
    }
    // ********************
    // View
    // ********************
    const showSignInForm = () => (
        <div className="card bg-light ml-auto mr-auto">
        <article className="card-body mx-auto ml-auto mr-auto" >
            <h4 className="card-title mt-3 text-center">Log In</h4>
            <p className="text-center">Start exploring</p>
            <form className="signin-form" onSubmit={handleSubmit} noValidate>
                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
                    </div>
                    <input name="email" className="form-control" placeholder="Email address" type="email" onChange={handleChange}/>
                </div>
                <div className="form-group input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                    </div>
                    <input name="password" className="form-control"  placeholder="Create password" type="password" onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-success btn-block">Sign In</button>
                </div>
                <p className="text-center">Don't have an account? <Link to="/signup" style={{color:"green"}} className="link-text">Register here</Link> </p>
            </form>
        </article>
    </div>
    )
    // ********************
    // Render
    // ********************
    return (
        <div className="container-fluid h-100 signin">
            <div className="container">
                <div className="row vh-100">
                    <div className="col-md-5 mx-auto align-self-center position-static">
                        {errorMsg && showErrMessage(errorMsg)}
                        {loading && <div className="text-center pb-4">{showLoading()}</div>}
                        {showSignInForm()}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SignIn