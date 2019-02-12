const initialState ={
    items: [],
    MessageList: []
}
import {GET_ROSTER, TEXT_MESSAGE} from '../store/type'

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ROSTER: {
            return {
                ...state,
                items: action.payLoad
            }
        }
        case TEXT_MESSAGE: {
           return {
               ...state,
               MessageList: action.payLoad
           }
       }
        default: return state
    }
}
