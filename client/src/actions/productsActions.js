import { LATEST_PRODUCTS } from '../actions/types'
import axios from 'axios'

const config = {
    headers:{
        'Content-Type':'application/json'
    }
}

export const getLatestProducts = () => {
    return (dispatch) => {
        return axios.get('/api/product/latest', config)
        .then(res => {dispatch ({
            type: LATEST_PRODUCTS,
            payload: res
        })
    })
        .catch(err => console.log(err))
    }

}
