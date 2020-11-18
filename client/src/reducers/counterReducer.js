import {INCREMENT, DECREMENT} from '../actions/types'

// let cart = JSON.parse(localStorage.getItem('cart'))


const counterReducer = (state = 1 , action) => {
    switch(action.type){
        case INCREMENT:
            console.log(action.payload.continents, action.payload.counter)
            if(action.payload.continents > state)
                state += 1
            else if(action.payload.continents === state){
                return action.payload.continents
            }    
            return state
        case DECREMENT:
            if(action.payload.counter === 1){
                return action.payload.counter
            }
            else{
               action.payload.counter -= 1
               if(action.payload.counter === 0){
                   action.payload.counter = 1
                   return action.payload.counter
               }
               return action.payload.counter
            }
        default:
            return state
    }
}

export default counterReducer