import {CALC_TOTAL} from '../actions/types'

let cart = JSON.parse(localStorage.getItem('cart'))


const totalReducer = (state = 0, action) => {
    console.log(action)
    switch (action.type) {
      case CALC_TOTAL:
          let total = cart.map((product) => {
              console.log(product)
              let temp = 0
              temp += product.price * product.counter
              console.log(temp)
              return temp 
          })
          state = total 
          return state
      default:
        return state
    }
  }
export default totalReducer  

