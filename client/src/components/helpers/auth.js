import { setCookies, getCookies, deleteCookies } from "./cookies"
import { setLocalStorage, getLocalStorage, deleteLocalStorage } from "./localStorage"

export const setAuthentication = (token, user) => {
    setCookies('token', token)
    setLocalStorage('user', user)
}

export const isAuthenticated = () => {
    if(getCookies('token') && getLocalStorage('user')) {
        return getLocalStorage('user')
    }
    else {
        return false
    }
}

export const logout = () => {
    deleteCookies('token')
    deleteLocalStorage('user')
    deleteLocalStorage('cart')
}