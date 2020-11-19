import axios from "axios"

const config = {
    headers: {
        'Content-Type': 'application/json',
    },
}

export const createProduct = async (formData) => {
    console.log(formData)
    return await axios.post('/api/product', formData, config)
}

export const getProducts = async() => {
    const response = await axios.get('/api/product', config)
    return response.data
}

export const searchProduct = async(searchQuery) => {
    return await axios.get(`/api/product/store/search/q=${searchQuery}`, {data: searchQuery} , config)
}

export const filterProduct = async(filterCategory) => {
    if(filterCategory.length > 0){
        return await axios.get(`api/product/store/filter/cat=${filterCategory}`, {data: filterCategory}, config)
    }
    else if(filterCategory.length === 0){
        return await axios.get(`api/product/store/filter/cat=none`, {data: "none"}, config)
    }
}

export const sortProduct = async(sortOption, filterCategory) => {
    return await axios.get(`api/product/store/sort/by=${sortOption}`, {params: {
        option: sortOption,
        filter: filterCategory,
    }}, config)
}

export const getProduct = async(_id) => {
   return await axios.get(`/api/product/details/${_id}`, {data: _id}, config)
}

export const removeProduct = async(_id) => {
    return await axios.delete(`/api/product/${_id}`, {data: _id}, config)
}

export const updateProduct = async(formData, _id) => {
    console.log(formData, _id)
    return await axios.put(`/api/product/update`, {data: formData, _id}, config)
}

export const getUserProducts = async(_id) => {
   const response = axios.get(`/api/product/user/${_id}`, _id, config)
   return response
}


