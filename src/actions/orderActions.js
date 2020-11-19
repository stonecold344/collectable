import axios from 'axios'
import { CREATE_ORDER, FETCH_ORDERS } from "./types";


const config = {
  headers:{
      'Content-Type':'application/json'
  }
}

export const createOrder = (props ,order)  => {
  console.log(props ,order)
  // fetch("/api/orders", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(order),
  // })
  //   .then((res) => res.json())
  //   .then((data) => {
  //     dispatch({ type: CREATE_ORDER, payload: data });
  //     localStorage.clear("cartItems");
  //     dispatch({ type: CLEAR_CART });
  //   });
  return (dispatch) => {
    return axios.post('/api/order', order, config)
    .then(() => {dispatch ({
        type: CREATE_ORDER,
        payload: order
    })
})
    .catch(err => console.log(err))
}
};

export const fetchOrders = () => (dispatch) => {
  fetch("/api/orders")
    .then((res) => res.json())
    .then((data) => {
      dispatch({ type: FETCH_ORDERS, payload: data });
    });
};
