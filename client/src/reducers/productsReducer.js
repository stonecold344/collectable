import { LATEST_PRODUCTS } from '../actions/types'


const productListReducer = (state = [], action) => {
    switch (action.type) {
        case LATEST_PRODUCTS:
            state = action.payload.data
            return state
      default:
        return state
    }
  }
export default productListReducer


