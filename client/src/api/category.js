import axios from "axios"
const config = {
    headers: {
        'Content-Type': 'application/json',
    },
}
export const createCategory = async(formData) => {
    const response = await axios.post('/api/category', formData, config)
    return response
}


export const removeCategory = async(formData) => {
    const response = await axios.delete('/api/category', {data: formData}, config)
    return response
}

export const getCategory = async() => {
    const response = await axios.get('/api/category')
    let data = response.data
    return data
}
