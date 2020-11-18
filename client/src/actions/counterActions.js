import {INCREMENT, DECREMENT} from './types'

export const increment = (_id) => {
    return {
        type: INCREMENT,
        payload: _id
   }
}

export const decrement = (_id) => {
    return {
        type: DECREMENT,
        payload: _id
   }
}