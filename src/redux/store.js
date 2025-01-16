import { applyMiddleware, legacy_createStore, combineReducers } from 'redux'
import { thunk } from 'redux-thunk'

import appReducer from './reducers/appReducer'
import authReducer from './reducers/authReducer'
import articleReducer from './reducers/articleReducer'
import postReducer from './reducers/postReducer'
import profileReducer from './reducers/profileReducer'
import errorReducer from './reducers/errorReducer'


const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    article: articleReducer,
    post: postReducer,
    profile: profileReducer,
    error: errorReducer
})

export default legacy_createStore(rootReducer, applyMiddleware(thunk))