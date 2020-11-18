import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from "./Header"
import Home from "./Home"
import SignUp from "./SignUp"
import SignIn from "./SignIn"
import NotFound from "./NotFound"
import Fotter from "./Fotter"
import UserDashboard from "./UserDashboard/UserDashboard"
import AdminDashboard from "./AdminDashboard/AdminDashboard"
import AdminRoute from "./AdminRoute"
import UserRoute from "./UserRoute"
import Cart from './Cart/Cart'
import Store from './Store/Store'
// import Search from './Store/Search'
import "../css/App.css"
import ProductDetails from './Store/ProductDetails';
import Order from './Cart/Order'

const App = () => {
  return(
    <BrowserRouter>  
      <Header/>
      <main>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/signup" component={SignUp}/>
          <Route exact path="/signin" component={SignIn}/>
          <UserRoute exact path="/user/dashboard" component={UserDashboard}/>
          <AdminRoute exact path="/admin/dashboard" component={AdminDashboard}/>
          <Route exact path="/cart/:userId" component={Cart}/>
          <Route exact path="/store" component={Store}/>
          <Route exact path="/details/:productId" component={ProductDetails}/>
          <Route exact path="/cart/:userId/order" component={Order}/>
          <Route component={NotFound}/>
        </Switch>
      </main>
      <Fotter/>
    </BrowserRouter>
)}

export default App;
