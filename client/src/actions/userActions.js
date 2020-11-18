import { GET_USER, GET_USER_PRODUCTS } from './types'

export const getUser = (user) => {
    return {
        type: GET_USER,
        payload: user
    }
}

export const getUserProducts = (user) => {
    return {
        type: GET_USER_PRODUCTS,
        payload: user
    }
}