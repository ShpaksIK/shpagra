import { errorTimeout } from "../../utils/timeouts"


// ======== Initialize ========
const SET_ERROR = 'SET_ERROR'

let defaultState = {
    text: null
}

// ======== Reducer ========
const errorReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_ERROR:
            return {
                ...state,
                text: action.payload
            }
        default:
            return state
    }
}

// ======== Action creators (AC) ========
const setErrorAC = (text) => ({
    type: SET_ERROR,
    payload: text
})

// ======== Thunks ========
export const setError = (text) => {
    setErrorAC(text)
    // setTimeout(() => {
    //     setError(null)
    // }, 3000)
}


export default errorReducer