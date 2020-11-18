import { CREATE_ORDER, FETCH_ORDERS } from "../actions/types";

const orderReducer = (state = {order:{},orders:[]}, action) => {
  switch (action.type) {
    case CREATE_ORDER:
      console.log(action.payload)
      return { order: action.payload };
    case FETCH_ORDERS:
      return { orders: action.payload };
    default:
      return state;
  }
};
export { orderReducer };
