import { getAuthUserData } from './authReducer'


// ======== Initialize ========
const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'
const SET_COMMENTS_FILTER_TYPE = 'SET_COMMENTS_FILTER_TYPE'

let defaultState = {
    initialized: false,
    commentsFilterType: 'new' // new, old, popular
}

// ======== Reducer ========
const appReducer = (state = defaultState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        case SET_COMMENTS_FILTER_TYPE:
            return {
                ...state,
                commentsFilterType: action.payload
            }
        default:
            return state
    }
}

// ======== Action creators (AC) ========
export const initializedSuccessAC = () => ({type: INITIALIZED_SUCCESS})

export const setCommentsFilterTypeAC = (type) => ({type: SET_COMMENTS_FILTER_TYPE, payload: type})

// ======== Thunks ========
export const initializeApp = () => async (dispatch) => {
    const authUserData = dispatch(getAuthUserData())
    Promise.all([authUserData]).then(() => {
        dispatch(initializedSuccessAC())
    })
}


export default appReducer