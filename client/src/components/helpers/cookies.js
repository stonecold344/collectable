import Cookies from "js-cookie"

export const setCookies = (key, value) => {
    Cookies.set(key,JSON.stringify(value), {expires: 1})
}

export const getCookies = (key) => {
    return Cookies.get(key)
}

export const deleteCookies = (key) => {
    Cookies.remove(key)
}