import axios from 'axios'
import { GET_USER, GET_USER_PRODUCTS} from '../actions/types'

const config = {
    headers:{
        'Content-Type':'application/json'
    }
}
const userReducer = (state = {user: {}, products: []} , action) => {
    switch (action.type) {
      case GET_USER:
        axios.get(`/api/auth/${action.payload}`, action.payload, config)
          .then(res => {
            state.user = res.data.userData}
            )
        return state
      case GET_USER_PRODUCTS:
          axios.get(`/api/product/user/${action.payload}`, action.payload, config)
          .then(res => {
              state.products = res.data
          })
          return state
      default:
        return state
    }
  }
export default userReducer

