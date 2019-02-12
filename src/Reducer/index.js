import { combineReducers } from 'redux'
import PostReducers from './postReducers'
export default combineReducers({
    posts: PostReducers,
})
