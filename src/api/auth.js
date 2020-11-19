import axios from "axios"

const config = {
    headers:{
        'Content-Type':'application/json'
    }
}

export const signup = async (data) => {
    return await axios.post("/api/auth/signup", data, config)
}

export const signin = async (data) => {
    return await axios.post("/api/auth/signin", data, config)
}

export const saveUserCart = async(_id,cart) => {
    const response = await axios.put(`/api/auth/cart/${_id}/save`, {data:cart}, config)
    return response
}

export const uploadAvatar = async(image) => {
    const response = await axios.put('/api/auth/avatar', {data: image})
    return response
}

export const getUser = async(_id) => {
    const response = await axios.get(`/api/auth/${_id}`, config)
    return response.data
}
