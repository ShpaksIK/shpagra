import { getAuthUserData } from './authReducer'


// ======== Initialize ========
const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'

let defaultState = {
    initialized: false
}

// ======== Reducer ========
const appReducer = (state = defaultState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}

// ======== Action creators (AC) ========
export const initializedSuccessAC = () => ({type: INITIALIZED_SUCCESS})

// ======== Thunks ========
export const initializeApp = () => async (dispatch) => {
    const authUserData = dispatch(getAuthUserData())
    Promise.all([authUserData]).then(() => {
        dispatch(initializedSuccessAC())
    })
}


export default appReducer