import {GET_CART, ADD_TO_CART, DELETE_FROM_CART, CLEAR_CART } from '../actions/types'

export const getCart = () => {
    return {
        type: GET_CART,
   }
}

export const addToCart = (product) => {
    return {
        type: ADD_TO_CART,
        payload: product
    }
}

export const deleteFromCart = (_id) => {
    return {
        type: DELETE_FROM_CART,
        payload: _id
    }
}

export const clearCart = () => {
    return {
        type:CLEAR_CART
    }
}
