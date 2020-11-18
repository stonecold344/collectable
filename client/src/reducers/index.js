import {combineReducers} from 'redux'
import cartReducer from './cartReducer'
import counterReducer from './counterReducer'
import { orderReducer } from './orderReducer'
import totalReducer from './totalReducer'
import userReducer from './userReducer'
import productListReducer from './productsReducer'

const allReducers = combineReducers({
    cart: cartReducer,
    counter: counterReducer,
    total: totalReducer,
    order: orderReducer,
    user: userReducer,
    productsList: productListReducer
})
export default allReducers
