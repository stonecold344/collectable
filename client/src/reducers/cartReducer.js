import { GET_CART, ADD_TO_CART, DELETE_FROM_CART, CLEAR_CART } from '../actions/types'
import { getUser} from '../api/auth'


// let cart = JSON.parse(localStorage.getItem('cart'))
let user = JSON.parse(localStorage.getItem('user'))




const cartReducer = (state = [], action) => {
    switch(action.type){
        case GET_CART:
            getUser(user.id).then(res => state = res.userData.cart)
            return state
        case ADD_TO_CART:
            const exists = state.find(product => product._id === action.payload._id)
            if(exists){
                return state
            }
            else{
                if(action.payload.counter > 1){
                    action.payload.counter = 1
                }
                state.push(action.payload)
                return state
            }
        case DELETE_FROM_CART:
            state = state.filter(product => product._id !== action.payload._id)
            return state
        case CLEAR_CART:
            state = []
            return state
            // case CART_SAVE_SHIPPING_ADDRESS:
            // return {
            //     ...state,
            //     shippingAddress: action.payload,
            // }
            // case CART_SAVE_PAYMENT_METHOD:
            // return {
            //     ...state,
            //     paymentMethod: action.payload,
            // }
        default:
            return state
    }
}

export default cartReducer

